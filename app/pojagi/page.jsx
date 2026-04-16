"use client";

import { useState } from 'react';
import DimensionInput from './DimensionInput';
import PatchworkCanvas from './PatchworkCanvas';

export default function PojagiPage() {
  const [dimensions, setDimensions] = useState(null);
  const [loadedPanels, setLoadedPanels] = useState(null);
  const [loadedPalette, setLoadedPalette] = useState(null);

  const handleLoadDesign = ({ dimensions: d, panels, palette }) => {
    setLoadedPanels(panels);
    setLoadedPalette(palette ?? null);
    setDimensions(d);
  };

  return dimensions === null ? (
    <DimensionInput
      onConfirm={(d) => { setLoadedPanels(null); setLoadedPalette(null); setDimensions(d); }}
      onLoadDesign={handleLoadDesign}
    />
  ) : (
    <PatchworkCanvas
      dimensions={dimensions}
      initialPanels={loadedPanels}
      initialPalette={loadedPalette}
      onReset={() => setDimensions(null)}
      onLoadDesign={handleLoadDesign}
    />
  );
}
