"use client";

import { useState, useRef } from 'react';

const snap5 = (v) => Math.round(v / 5) * 5;
const newId = () => crypto.randomUUID();

export default function DimensionInput({ onConfirm, onLoadDesign }) {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileLoad = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const lines = ev.target.result.trim().split('\n');
        const parts = lines[0].split(' ');
        if (parts[0] !== 'pojagi') { setError('Invalid file.'); return; }
        const [w, h] = parts[1].split('x').map(Number);
        const palette = parts[2]
          ? Object.fromEntries(parts[2].split(',').map((hex, i) => [i + 1, hex]))
          : null;
        const panels = lines.slice(1).map((line) => {
          const [x, y, width, height, color] = line.split(',').map(Number);
          return { id: newId(), x, y, width, height, color };
        });
        onLoadDesign({ dimensions: { width: w, height: h }, panels, palette });
      } catch {
        setError('Could not read file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleConfirm = () => {
    const w = snap5(parseInt(width, 10));
    const h = snap5(parseInt(height, 10));
    if (!w || !h || w < 50 || h < 50) {
      setError('Both dimensions must be at least 50mm.');
      return;
    }
    onConfirm({ width: w, height: h });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleConfirm();
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="border-2 border-black p-8 max-w-sm w-full mx-4">
        <h1 className="font-sans font-bold text-2xl mb-1">Pojagi Designer</h1>
        <p className="font-sans text-gray-400 text-sm mb-6">Enter curtain dimensions in mm</p>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-sans text-xs font-semibold mb-1 uppercase tracking-wide">
              Width (mm)
            </label>
            <input
              type="number"
              min="50"
              step="5"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border-2 border-black px-3 py-2 font-sans text-lg focus:outline-none"
              placeholder="600"
              autoFocus
            />
          </div>
          <div className="flex-1">
            <label className="block font-sans text-xs font-semibold mb-1 uppercase tracking-wide">
              Height (mm)
            </label>
            <input
              type="number"
              min="50"
              step="5"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border-2 border-black px-3 py-2 font-sans text-lg focus:outline-none"
              placeholder="900"
            />
          </div>
        </div>
        {error && (
          <p className="font-sans text-red-600 text-sm mb-3">{error}</p>
        )}
        <button
          onClick={handleConfirm}
          className="w-full bg-black text-white font-sans font-semibold py-2 hover:bg-gray-800 transition-colors"
        >
          Create
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full mt-2 border-2 border-black font-sans font-semibold py-2 hover:bg-gray-50 transition-colors text-sm"
        >
          Load design
        </button>
        <input ref={fileInputRef} type="file" accept=".pojagi" className="hidden" onChange={handleFileLoad} />
      </div>
    </div>
  );
}
