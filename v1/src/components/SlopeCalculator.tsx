"use client";

import { useState, useMemo } from "react";
import {
  calculateOverturningFOS,
  calculateSlidingFOS,
  calculatePreliminaryWallThickness,
  calculateFoundationDepth,
  SOIL_PARAMS,
} from "@/lib/calculations";

const soilTypes = [
  { value: "clay", label: "Clay" },
  { value: "sand", label: "Sand" },
  { value: "gravel", label: "Gravel" },
  { value: "rock", label: "Rock" },
];

export default function SlopeCalculator() {
  const [slopeAngle, setSlopeAngle] = useState(30);
  const [wallHeight, setWallHeight] = useState(3);
  const [soilType, setSoilType] = useState("clay");

  const results = useMemo(() => {
    const wallThickness = calculatePreliminaryWallThickness(wallHeight, soilType);
    const overturningFOS = calculateOverturningFOS(wallHeight, wallThickness, soilType);
    const slidingFOS = calculateSlidingFOS(wallHeight, wallThickness, soilType);
    const foundationDepth = calculateFoundationDepth(wallHeight, soilType);

    return {
      wallThickness,
      overturningFOS,
      slidingFOS,
      foundationDepth,
    };
  }, [wallHeight, soilType]);

  const soil = SOIL_PARAMS[soilType];

  return (
    <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
      <div className="bg-[#2c3e50] text-white p-4">
        <h3 className="font-bold text-lg">PRELIMINARY SLOPE STABILITY CALCULATOR</h3>
      </div>

      <div className="p-6">
        {/* Dynamic SVG Diagram */}
        <div className="mb-6 bg-[#fafafa] rounded-lg p-4">
          <svg viewBox="0 0 400 250" className="w-full h-auto">
            {/* Ground line */}
            <line x1="50" y1="200" x2="350" y2="200" stroke="#4a4a4a" strokeWidth="2" />

            {/* Slope */}
            <polygon
              points={`150,200 250,${200 - wallHeight * 30} 250,200`}
              fill="#d4a574"
              stroke="#8b6914"
              strokeWidth="1"
            />

            {/* Retaining wall */}
            <rect
              x="250"
              y={200 - wallHeight * 30}
              width={results.wallThickness * 50}
              height={wallHeight * 30}
              fill="#6b7280"
              stroke="#374151"
              strokeWidth="2"
            />

            {/* Foundation */}
            <rect
              x="245"
              y="200"
              width={results.wallThickness * 50 + 10}
              height={results.foundationDepth * 20}
              fill="#9ca3af"
              stroke="#4b5563"
              strokeWidth="1"
            />

            {/* Force arrows */}
            {/* Weight arrow */}
            <line
              x1={250 + results.wallThickness * 25}
              y1={200 - wallHeight * 15}
              x2={250 + results.wallThickness * 25}
              y2={200 - wallHeight * 15 + 40}
              stroke="#2563eb"
              strokeWidth="2"
              markerEnd="url(#arrowBlue)"
            />
            <text
              x={260 + results.wallThickness * 25}
              y={200 - wallHeight * 15 + 25}
              fill="#2563eb"
              fontSize="12"
              fontWeight="bold"
            >
              W
            </text>

            {/* Earth pressure arrow */}
            <line
              x1="230"
              y1={200 - wallHeight * 15}
              x2="250"
              y2={200 - wallHeight * 15}
              stroke="#dc2626"
              strokeWidth="2"
              markerEnd="url(#arrowRed)"
            />
            <text x="205" y={200 - wallHeight * 15 + 4} fill="#dc2626" fontSize="12" fontWeight="bold">
              Pa
            </text>

            {/* Reaction arrow */}
            <line
              x1={250 + results.wallThickness * 25}
              y1={200 + results.foundationDepth * 20 + 10}
              x2={250 + results.wallThickness * 25}
              y2={200 + results.foundationDepth * 20 - 20}
              stroke="#16a34a"
              strokeWidth="2"
              markerEnd="url(#arrowGreen)"
            />
            <text
              x={260 + results.wallThickness * 25}
              y={200 + results.foundationDepth * 20}
              fill="#16a34a"
              fontSize="12"
              fontWeight="bold"
            >
              R
            </text>

            {/* Dimensions */}
            <text x="55" y="215" fill="#4a4a4a" fontSize="10">
              Ground Level
            </text>
            <text x="255" y={195 - wallHeight * 30} fill="#4a4a4a" fontSize="10">
              H = {wallHeight}m
            </text>
            <text x="255" y="230" fill="#4a4a4a" fontSize="10">
              D = {results.foundationDepth.toFixed(1)}m
            </text>

            {/* Arrow markers */}
            <defs>
              <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#2563eb" />
              </marker>
              <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#dc2626" />
              </marker>
              <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#16a34a" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="flex justify-between text-sm font-medium text-[#1a1a1a] mb-2">
              <span>Slope Angle</span>
              <span className="text-[#d35400]">{slopeAngle}°</span>
            </label>
            <input
              type="range"
              min="15"
              max="60"
              value={slopeAngle}
              onChange={(e) => setSlopeAngle(Number(e.target.value))}
              className="w-full h-2 bg-[#e0e0e0] rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium text-[#1a1a1a] mb-2">
              <span>Wall Height</span>
              <span className="text-[#d35400]">{wallHeight}m</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={wallHeight}
              onChange={(e) => setWallHeight(Number(e.target.value))}
              className="w-full h-2 bg-[#e0e0e0] rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Soil Type</label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full p-3 border border-[#e0e0e0] rounded-lg focus:border-[#d35400] focus:outline-none"
            >
              {soilTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Soil Parameters */}
        <div className="bg-[#fafafa] p-4 rounded-lg mb-6 text-sm">
          <p className="font-medium text-[#1a1a1a] mb-2">Soil Parameters ({soilType})</p>
          <div className="grid grid-cols-3 gap-2 text-[#4a4a4a]">
            <div>γ = {soil.unitWeight} kN/m³</div>
            <div>φ = {soil.frictionAngle}°</div>
            <div>c = {soil.cohesion} kPa</div>
          </div>
        </div>

        {/* Results */}
        <div className="border-t border-[#e0e0e0] pt-6">
          <h4 className="font-bold text-[#1a1a1a] mb-4">RESULTS</h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#fafafa] p-4 rounded-lg">
              <p className="text-sm text-[#4a4a4a] mb-1">Factor of Safety (Overturning)</p>
              <p className={`text-2xl font-bold ${results.overturningFOS >= 2 ? "text-green-600" : "text-red-600"}`}>
                {results.overturningFOS.toFixed(2)} {results.overturningFOS >= 2 ? "✓" : "✗"}
              </p>
            </div>

            <div className="bg-[#fafafa] p-4 rounded-lg">
              <p className="text-sm text-[#4a4a4a] mb-1">Factor of Safety (Sliding)</p>
              <p className={`text-2xl font-bold ${results.slidingFOS >= 1.5 ? "text-green-600" : "text-red-600"}`}>
                {results.slidingFOS.toFixed(2)} {results.slidingFOS >= 1.5 ? "✓" : "✗"}
              </p>
            </div>

            <div className="bg-[#fafafa] p-4 rounded-lg">
              <p className="text-sm text-[#4a4a4a] mb-1">Preliminary Wall Thickness</p>
              <p className="text-2xl font-bold text-[#1a1a1a]">{results.wallThickness.toFixed(2)}m</p>
            </div>

            <div className="bg-[#fafafa] p-4 rounded-lg">
              <p className="text-sm text-[#4a4a4a] mb-1">Foundation Depth Required</p>
              <p className="text-2xl font-bold text-[#1a1a1a]">{results.foundationDepth.toFixed(2)}m</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              ⚠️ <strong>For preliminary assessment only.</strong> Requires site-specific geotechnical investigation before construction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
