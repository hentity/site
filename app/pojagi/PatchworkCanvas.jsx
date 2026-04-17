"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { COLORS, COLOR_NAMES } from './constants';
import MeasurementsModal from './MeasurementsModal';

const snap5 = (v) => Math.round(v / 5) * 5;
const newId = () => crypto.randomUUID();
const EDGE_THRESHOLD_PX = 8;

// Two panels share an edge if they touch along a horizontal or vertical boundary
// with actual overlap (not just a corner touch).
const sharesEdge = (a, b) => {
  const shareH = Math.abs(a.y + a.height - b.y) < 0.01 || Math.abs(b.y + b.height - a.y) < 0.01;
  const xOverlap = a.x < b.x + b.width - 0.01 && b.x < a.x + a.width - 0.01;
  const shareV = Math.abs(a.x + a.width - b.x) < 0.01 || Math.abs(b.x + b.width - a.x) < 0.01;
  const yOverlap = a.y < b.y + b.height - 0.01 && b.y < a.y + a.height - 0.01;
  return (shareH && xOverlap) || (shareV && yOverlap);
};

// Greedy graph colouring with a random node ordering — different each call.
const graphColor = (panels, colorKeys) => {
  if (colorKeys.length === 0) return panels;
  const adj = {};
  panels.forEach((p) => { adj[p.id] = []; });
  for (let i = 0; i < panels.length; i++) {
    for (let j = i + 1; j < panels.length; j++) {
      if (sharesEdge(panels[i], panels[j])) {
        adj[panels[i].id].push(panels[j].id);
        adj[panels[j].id].push(panels[i].id);
      }
    }
  }
  const shuffled = [...panels].sort(() => Math.random() - 0.5);
  const assignment = {};
  shuffled.forEach((panel) => {
    const used = new Set(adj[panel.id].map((id) => assignment[id]).filter(Boolean));
    const candidates = [...colorKeys].sort(() => Math.random() - 0.5);
    assignment[panel.id] = candidates.find((c) => !used.has(c)) ?? candidates[0];
  });
  return panels.map((p) => ({ ...p, color: assignment[p.id] }));
};

const canMerge = (sel) => {
  if (sel.length < 2) return false;
  const minX = Math.min(...sel.map((p) => p.x));
  const minY = Math.min(...sel.map((p) => p.y));
  const maxX = Math.max(...sel.map((p) => p.x + p.width));
  const maxY = Math.max(...sel.map((p) => p.y + p.height));
  const boundingArea = (maxX - minX) * (maxY - minY);
  const sumArea = sel.reduce((a, p) => a + p.width * p.height, 0);
  return Math.abs(boundingArea - sumArea) < 0.01;
};

// Find the nearest internal edge to the mouse position.
// Returns null or { type:'H'|'V', position, upperIds/lowerIds or leftIds/rightIds }
const findNearestEdge = (mmX, mmY, panels, curtainW, curtainH, thresholdMm) => {
  let nearest = null;
  let nearestDist = Infinity;

  // Horizontal internal edges
  const yVals = [...new Set(panels.flatMap((p) => [p.y, p.y + p.height]))]
    .filter((y) => y > 0.01 && y < curtainH - 0.01);

  for (const y of yVals) {
    const upper = panels.filter((p) => Math.abs(p.y + p.height - y) < 0.01);
    const lower = panels.filter((p) => Math.abs(p.y - y) < 0.01);
    if (!upper.length || !lower.length) continue;
    const touching = [...upper, ...lower];
    const xMin = Math.min(...touching.map((p) => p.x));
    const xMax = Math.max(...touching.map((p) => p.x + p.width));
    const dist = Math.abs(mmY - y);
    if (dist <= thresholdMm && mmX >= xMin - 0.01 && mmX <= xMax + 0.01 && dist < nearestDist) {
      nearest = { type: 'H', position: y, upperIds: upper.map((p) => p.id), lowerIds: lower.map((p) => p.id) };
      nearestDist = dist;
    }
  }

  // Vertical internal edges
  const xVals = [...new Set(panels.flatMap((p) => [p.x, p.x + p.width]))]
    .filter((x) => x > 0.01 && x < curtainW - 0.01);

  for (const x of xVals) {
    const left = panels.filter((p) => Math.abs(p.x + p.width - x) < 0.01);
    const right = panels.filter((p) => Math.abs(p.x - x) < 0.01);
    if (!left.length || !right.length) continue;
    const touching = [...left, ...right];
    const yMin = Math.min(...touching.map((p) => p.y));
    const yMax = Math.max(...touching.map((p) => p.y + p.height));
    const dist = Math.abs(mmX - x);
    if (dist <= thresholdMm && mmY >= yMin - 0.01 && mmY <= yMax + 0.01 && dist < nearestDist) {
      nearest = { type: 'V', position: x, leftIds: left.map((p) => p.id), rightIds: right.map((p) => p.id) };
      nearestDist = dist;
    }
  }

  return nearest;
};

export default function PatchworkCanvas({ dimensions, initialPanels, initialPalette, onReset, onLoadDesign }) {
  const { width: curtainW, height: curtainH } = dimensions;

  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const fileInputRef = useRef(null);
  const stateRef = useRef({});
  const mouseMmRef = useRef({ mmX: 0, mmY: 0 });
  const edgeDragRef = useRef(null); // { type, currentPosition, upperIds/lowerIds or leftIds/rightIds }
  const didEdgeDrag = useRef(false);

  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [panels, setPanels] = useState(
    initialPanels ?? [{ id: newId(), x: 0, y: 0, width: curtainW, height: curtainH, color: 1 }]
  );
  const [hoveredId, setHoveredId] = useState(null);
  const [hoveredEdge, setHoveredEdge] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [mergeError, setMergeError] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [autoColorKeys, setAutoColorKeys] = useState(new Set([1, 2, 3, 4, 5, 6]));
  const [palette, setPalette] = useState(initialPalette ?? { ...COLORS });
  const [history, setHistory] = useState([]);

  stateRef.current = { hoveredId, selectedIds, panels, palette };

  const pushHistory = useCallback(() => {
    const { panels, palette } = stateRef.current;
    setHistory((prev) => {
      const next = [...prev, { panels, palette }];
      return next.length > 50 ? next.slice(1) : next;
    });
  }, []);

  const undo = useCallback(() => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const snapshot = prev[prev.length - 1];
      setPanels(snapshot.panels);
      setPalette(snapshot.palette);
      return prev.slice(0, -1);
    });
  }, []);

  // ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setContainerSize({ w: width, h: height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scale, offsetX, offsetY } = useMemo(() => {
    if (!containerSize.w || !containerSize.h) return { scale: 1, offsetX: 0, offsetY: 0 };
    const PADDING = 48;
    const s = Math.min((containerSize.w - PADDING * 2) / curtainW, (containerSize.h - PADDING * 2) / curtainH) * 0.85;
    return {
      scale: s,
      offsetX: (containerSize.w - curtainW * s) / 2,
      offsetY: (containerSize.h - curtainH * s) / 2,
    };
  }, [containerSize, curtainW, curtainH]);

  const pxX = (mmX) => mmX * scale + offsetX;
  const pxY = (mmY) => mmY * scale + offsetY;
  const pxLen = (mm) => mm * scale;

  const getSvgCoords = useCallback((e) => {
    const rect = svgRef.current.getBoundingClientRect();
    return { svgX: e.clientX - rect.left, svgY: e.clientY - rect.top };
  }, []);

  const svgToMm = (svgX, svgY) => ({
    mmX: (svgX - offsetX) / scale,
    mmY: (svgY - offsetY) / scale,
  });

  const hitPanel = (mmX, mmY, panelList) =>
    panelList.find((p) => mmX >= p.x && mmX <= p.x + p.width && mmY >= p.y && mmY <= p.y + p.height);

  // ── Edge drag ──────────────────────────────────────────────────────────────

  const applyEdgeDrag = useCallback((mmX, mmY) => {
    const dr = edgeDragRef.current;
    if (!dr) return;
    const { panels } = stateRef.current;

    let delta;
    if (dr.type === 'H') {
      const maxUp = Math.min(...panels.filter((p) => dr.upperIds.includes(p.id)).map((p) => p.height - 5));
      const maxDown = Math.min(...panels.filter((p) => dr.lowerIds.includes(p.id)).map((p) => p.height - 5));
      const clamped = Math.max(dr.currentPosition - maxUp, Math.min(dr.currentPosition + maxDown, mmY));
      const target = snap5(clamped);
      delta = target - dr.currentPosition;
      if (delta === 0) return;
      dr.currentPosition = target;
    } else {
      const maxLeft = Math.min(...panels.filter((p) => dr.leftIds.includes(p.id)).map((p) => p.width - 5));
      const maxRight = Math.min(...panels.filter((p) => dr.rightIds.includes(p.id)).map((p) => p.width - 5));
      const clamped = Math.max(dr.currentPosition - maxLeft, Math.min(dr.currentPosition + maxRight, mmX));
      const target = snap5(clamped);
      delta = target - dr.currentPosition;
      if (delta === 0) return;
      dr.currentPosition = target;
    }

    setPanels((prev) =>
      prev.map((p) => {
        if (dr.type === 'H') {
          if (dr.upperIds.includes(p.id)) return { ...p, height: p.height + delta };
          if (dr.lowerIds.includes(p.id)) return { ...p, y: p.y + delta, height: p.height - delta };
        } else {
          if (dr.leftIds.includes(p.id)) return { ...p, width: p.width + delta };
          if (dr.rightIds.includes(p.id)) return { ...p, x: p.x + delta, width: p.width - delta };
        }
        return p;
      })
    );
  }, []);

  // ── Actions ────────────────────────────────────────────────────────────────

  const startSplit = useCallback((panelId, direction) => {
    const panel = stateRef.current.panels.find((p) => p.id === panelId);
    if (!panel) return;
    pushHistory();
    const { mmX, mmY } = mouseMmRef.current;
    const position =
      direction === 'H'
        ? snap5(Math.max(panel.y + 5, Math.min(panel.y + panel.height - 5, mmY)))
        : snap5(Math.max(panel.x + 5, Math.min(panel.x + panel.width - 5, mmX)));
    const newPanels =
      direction === 'H'
        ? [
            { ...panel, height: position - panel.y },
            { ...panel, id: newId(), y: position, height: panel.y + panel.height - position },
          ]
        : [
            { ...panel, width: position - panel.x },
            { ...panel, id: newId(), x: position, width: panel.x + panel.width - position },
          ];
    setSelectedIds(new Set());
    setPanels((prev) => prev.filter((p) => p.id !== panelId).concat(newPanels));
  }, [pushHistory]);

  const handleMerge = useCallback(() => {
    const { selectedIds, panels } = stateRef.current;
    const selected = panels.filter((p) => selectedIds.has(p.id));
    if (!canMerge(selected)) {
      // don't push history on invalid merge
      setMergeError(true);
      setTimeout(() => setMergeError(false), 600);
      return;
    }
    pushHistory();
    const minX = Math.min(...selected.map((p) => p.x));
    const minY = Math.min(...selected.map((p) => p.y));
    const maxX = Math.max(...selected.map((p) => p.x + p.width));
    const maxY = Math.max(...selected.map((p) => p.y + p.height));
    setPanels((prev) =>
      prev.filter((p) => !selectedIds.has(p.id)).concat({
        id: newId(), x: minX, y: minY, width: maxX - minX, height: maxY - minY, color: selected[0].color,
      })
    );
    setSelectedIds(new Set());
  }, [pushHistory]);

  const assignColor = useCallback((colorNum) => {
    const { hoveredId } = stateRef.current;
    if (!hoveredId) return;
    pushHistory();
    setPanels((prev) => prev.map((p) => (p.id === hoveredId ? { ...p, color: colorNum } : p)));
  }, [pushHistory]);

  const saveDesign = useCallback(() => {
    const { panels } = stateRef.current;
    const paletteStr = Object.values(palette).join(',');
    const lines = [`pojagi ${curtainW}x${curtainH} ${paletteStr}`];
    panels.forEach((p) => lines.push(`${p.x},${p.y},${p.width},${p.height},${p.color}`));
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design.pojagi';
    a.click();
    URL.revokeObjectURL(url);
  }, [curtainW, curtainH, palette]);

  const handleFileLoad = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const lines = ev.target.result.trim().split('\n');
        const parts = lines[0].split(' ');
        if (parts[0] !== 'pojagi') return;
        const [w, h] = parts[1].split('x').map(Number);
        const loadedPalette = parts[2]
          ? Object.fromEntries(parts[2].split(',').map((hex, i) => [i + 1, hex]))
          : { ...COLORS };
        const parsed = lines.slice(1).map((line) => {
          const [x, y, width, height, color] = line.split(',').map(Number);
          return { id: newId(), x, y, width, height, color };
        });
        onLoadDesign({ dimensions: { width: w, height: h }, panels: parsed, palette: loadedPalette });
      } catch {}
    };
    reader.readAsText(file);
    e.target.value = '';
  }, [onLoadDesign]);

  // ── Keyboard handler ───────────────────────────────────────────────────────

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undo(); return; }
      if (e.target.tagName === 'INPUT') return;
      const { hoveredId, selectedIds } = stateRef.current;
      if ((e.key === 'h' || e.key === 'H') && hoveredId) startSplit(hoveredId, 'H');
      if ((e.key === 'v' || e.key === 'V') && hoveredId) startSplit(hoveredId, 'V');
      if ((e.key === 'm' || e.key === 'M') && selectedIds.size > 0) handleMerge();
      if ('123456'.includes(e.key) && hoveredId) assignColor(parseInt(e.key));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [startSplit, handleMerge, assignColor, undo]);

  // Global mouseup — end edge drag
  useEffect(() => {
    const onMouseUp = () => {
      if (edgeDragRef.current) {
        edgeDragRef.current = null;
        didEdgeDrag.current = true;
        setHoveredEdge(null);
      }
    };
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, []);

  // ── SVG mouse handlers ─────────────────────────────────────────────────────

  const handleSvgMouseMove = useCallback(
    (e) => {
      const { svgX, svgY } = getSvgCoords(e);
      const { mmX, mmY } = svgToMm(svgX, svgY);
      mouseMmRef.current = { mmX, mmY };

      // Edge drag in progress
      if (edgeDragRef.current) {
        applyEdgeDrag(mmX, mmY);
        return;
      }

      const { panels } = stateRef.current;

      // Edge hover detection
      const thresholdMm = EDGE_THRESHOLD_PX / scale;
      const edge = findNearestEdge(mmX, mmY, panels, curtainW, curtainH, thresholdMm);
      if (edge) {
        setHoveredEdge(edge);
        setHoveredId(null);
        return;
      }

      setHoveredEdge(null);
      setHoveredId(hitPanel(mmX, mmY, panels)?.id ?? null);
    },
    [getSvgCoords, applyEdgeDrag, scale, curtainW, curtainH, offsetX, offsetY]
  );

  const handleSvgMouseLeave = useCallback(() => {
    if (!edgeDragRef.current) {
      setHoveredId(null);
      setHoveredEdge(null);
    }
  }, []);

  const handleSvgMouseDown = useCallback(
    (e) => {
      const { splitState, panels } = stateRef.current;
      if (splitState) return;
      const { svgX, svgY } = getSvgCoords(e);
      const { mmX, mmY } = svgToMm(svgX, svgY);
      const thresholdMm = EDGE_THRESHOLD_PX / scale;
      const edge = findNearestEdge(mmX, mmY, panels, curtainW, curtainH, thresholdMm);
      if (edge) {
        e.preventDefault();
        pushHistory();
        edgeDragRef.current = {
          type: edge.type,
          currentPosition: edge.position,
          ...(edge.type === 'H'
            ? { upperIds: edge.upperIds, lowerIds: edge.lowerIds }
            : { leftIds: edge.leftIds, rightIds: edge.rightIds }),
        };
      }
    },
    [getSvgCoords, scale, curtainW, curtainH, offsetX, offsetY, pushHistory]
  );

  const handleSvgClick = useCallback(
    (e) => {
      if (didEdgeDrag.current) { didEdgeDrag.current = false; return; }
      const { svgX, svgY } = getSvgCoords(e);
      const { mmX, mmY } = svgToMm(svgX, svgY);
      const thresholdMm = EDGE_THRESHOLD_PX / scale;
      if (findNearestEdge(mmX, mmY, stateRef.current.panels, curtainW, curtainH, thresholdMm)) return;
      const hit = hitPanel(mmX, mmY, stateRef.current.panels);
      if (!hit) return;
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.has(hit.id) ? next.delete(hit.id) : next.add(hit.id);
        return next;
      });
    },
    [getSvgCoords, scale, curtainW, curtainH, offsetX, offsetY]
  );

  // ── Cursor ─────────────────────────────────────────────────────────────────

  const svgCursor = hoveredEdge?.type === 'H' ? 'ns-resize' : hoveredEdge?.type === 'V' ? 'ew-resize' : 'default';

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="w-full h-full flex flex-col select-none">
      {/* Toolbar */}
      <div className="flex items-center px-3 py-2 border-b border-gray-200 gap-3 flex-shrink-0 bg-white">
        <button
          onClick={() => { if (window.confirm('Reset the design? All panels will be lost.')) onReset(); }}
          className="font-sans text-xs font-semibold border border-gray-300 px-2.5 py-1 hover:border-black transition-colors flex-shrink-0"
        >
          Reset
        </button>
        <button
          onClick={saveDesign}
          className="font-sans text-xs font-semibold border border-gray-300 px-2.5 py-1 hover:border-black transition-colors flex-shrink-0"
        >
          Save
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="font-sans text-xs font-semibold border border-gray-300 px-2.5 py-1 hover:border-black transition-colors flex-shrink-0"
        >
          Load
        </button>
        <input ref={fileInputRef} type="file" accept=".pojagi" className="hidden" onChange={handleFileLoad} />
        <div className="flex items-center gap-3 text-xs font-mono text-gray-400 flex-wrap flex-1">
          <span><kbd className="bg-gray-100 px-1 border border-gray-200 rounded">H</kbd> split horiz</span>
          <span><kbd className="bg-gray-100 px-1 border border-gray-200 rounded">V</kbd> split vert</span>
          <span><kbd className="bg-gray-100 px-1 border border-gray-200 rounded">M</kbd> merge</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6].map((k) => (
              <div key={k} className="flex flex-col items-center gap-0.5 group relative">
                <div
                  className="w-5 h-5 border border-gray-300 group-hover:border-black transition-colors cursor-pointer"
                  style={{ backgroundColor: palette[k] }}
                  onClick={() => assignColor(k)}
                />
                <label
                  title={`Edit colour ${k}`}
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onMouseDown={(e) => { e.stopPropagation(); pushHistory(); }}
                  onClick={(e) => { e.stopPropagation(); e.currentTarget.nextSibling.click(); }}
                />
                <input
                  type="color"
                  value={palette[k]}
                  onChange={(e) => setPalette((prev) => ({ ...prev, [k]: e.target.value }))}
                  className="sr-only"
                />
                <span className="font-mono text-[9px] text-gray-400">{k}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1 border-l border-gray-200 pl-3 flex-shrink-0">
          {[1, 2, 3, 4, 5, 6].map((k) => {
            const active = autoColorKeys.has(k);
            return (
              <button
                key={k}
                title={COLOR_NAMES[k]}
                onClick={() =>
                  setAutoColorKeys((prev) => {
                    const next = new Set(prev);
                    next.has(k) ? next.delete(k) : next.add(k);
                    return next;
                  })
                }
                className="w-5 h-5 border transition-all"
                style={{ backgroundColor: palette[k], borderColor: active ? '#000' : '#d1d5db', opacity: active ? 1 : 0.3 }}
              />
            );
          })}
          <button
            onClick={() => { pushHistory(); setPanels((prev) => graphColor(prev, [...autoColorKeys])); }}
            disabled={autoColorKeys.size === 0}
            className="font-sans text-xs font-semibold border border-gray-300 px-2 py-1 hover:border-black transition-colors ml-1 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Auto Colour
          </button>
        </div>
        <button
          onClick={() => setShowMeasurements(true)}
          className="font-sans text-xs font-semibold border border-gray-300 px-2.5 py-1 hover:border-black transition-colors flex-shrink-0"
        >
          Measurements
        </button>
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="flex-1 relative overflow-hidden">
        {containerSize.w > 0 && (
          <svg
            ref={svgRef}
            className="absolute inset-0"
            width={containerSize.w}
            height={containerSize.h}
            style={{ cursor: svgCursor }}
            onMouseMove={handleSvgMouseMove}
            onMouseLeave={handleSvgMouseLeave}
            onMouseDown={handleSvgMouseDown}
            onClick={handleSvgClick}
          >
            {panels.map((panel) => {
              const x = pxX(panel.x);
              const y = pxY(panel.y);
              const w = pxLen(panel.width);
              const h = pxLen(panel.height);
              const isHovered = hoveredId === panel.id;
              const isSelected = selectedIds.has(panel.id);
              const hasError = mergeError && isSelected;
              const fontSize = Math.max(8, Math.min(11, w * 0.12));
              const labels = [{ text: `${panel.width}×${panel.height}`, tx: x + w - 4, ty: y + fontSize + 2 }];

              return (
                <g key={panel.id}>
                  <rect
                    x={x} y={y} width={w} height={h}
                    fill={palette[panel.color]}
                    stroke={hasError ? '#ef4444' : isSelected ? '#3b82f6' : '#000'}
                    strokeWidth={hasError || isSelected ? 2.5 : 1}
                  />
                  {isHovered && (
                    <rect x={x} y={y} width={w} height={h} fill="black" fillOpacity={0.08} pointerEvents="none" />
                  )}
                  {labels.map(({ text, tx, ty }) => (
                    <text key={text + tx} x={tx} y={ty} textAnchor="end" fontSize={fontSize} fontFamily="monospace" fill="#00000066" pointerEvents="none">
                      {text}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {showMeasurements && (
        <MeasurementsModal panels={panels} palette={palette} onClose={() => setShowMeasurements(false)} />
      )}
    </div>
  );
}
