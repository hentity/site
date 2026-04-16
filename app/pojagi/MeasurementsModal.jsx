"use client";

import { useState, useMemo } from 'react';
import { COLOR_NAMES } from './constants';

export default function MeasurementsModal({ panels, palette, onClose }) {
  const [seamAllowance, setSeamAllowance] = useState(15);

  const measurements = useMemo(() => {
    const grouped = {};
    panels.forEach((panel) => {
      const cutW = panel.width + 2 * seamAllowance;
      const cutH = panel.height + 2 * seamAllowance;
      const sizeKey = `${cutW}×${cutH}mm`;
      if (!grouped[panel.color]) grouped[panel.color] = {};
      grouped[panel.color][sizeKey] = (grouped[panel.color][sizeKey] || 0) + 1;
    });
    return grouped;
  }, [panels, seamAllowance]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="border-2 border-black max-w-md w-full mx-4 max-h-[80vh] flex flex-col" style={{ backgroundColor: '#ffffff' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-black">
          <h2 className="font-sans font-bold text-lg">Cut Measurements</h2>
          <button
            onClick={onClose}
            className="font-sans text-gray-400 hover:text-black text-lg leading-none"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-3 border-b border-gray-200 flex items-center gap-3">
          <label className="font-sans text-xs font-semibold uppercase tracking-wide">
            Seam allowance
          </label>
          <input
            type="number"
            min="0"
            step="5"
            value={seamAllowance}
            onChange={(e) =>
              setSeamAllowance(Math.max(0, parseInt(e.target.value) || 0))
            }
            className="border-2 border-black px-2 py-1 font-sans w-16 focus:outline-none text-sm"
          />
          <span className="font-sans text-xs text-gray-400">mm per side</span>
        </div>
        <div className="overflow-y-auto px-5 py-4 flex flex-col gap-5">
          {Object.keys(measurements).length === 0 ? (
            <p className="font-sans text-sm text-gray-400">No panels yet.</p>
          ) : (
            Object.entries(measurements)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([colorKey, sizes]) => (
                <div key={colorKey}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className="w-3.5 h-3.5 border border-black flex-shrink-0"
                      style={{ backgroundColor: palette[Number(colorKey)] }}
                    />
                    <span className="font-sans text-sm font-bold">
                      {COLOR_NAMES[Number(colorKey)]}
                    </span>
                  </div>
                  <ul className="ml-6 font-sans text-sm text-gray-600 space-y-0.5">
                    {Object.entries(sizes).map(([size, count]) => (
                      <li key={size}>
                        {count}× {size}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
