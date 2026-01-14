// Slope stability calculations based on geotechnical engineering principles

export interface SoilParams {
  unitWeight: number;      // kN/m³
  frictionAngle: number;   // degrees
  cohesion: number;        // kPa
}

export const SOIL_PARAMS: Record<string, SoilParams> = {
  clay: { unitWeight: 18, frictionAngle: 20, cohesion: 25 },
  sand: { unitWeight: 19, frictionAngle: 32, cohesion: 0 },
  gravel: { unitWeight: 20, frictionAngle: 38, cohesion: 0 },
  rock: { unitWeight: 25, frictionAngle: 45, cohesion: 50 },
};

// Rankine earth pressure coefficient (simplified, ignores slope)
export function calculateActiveEarthPressureCoeff(phi: number): number {
  const phiRad = (phi * Math.PI) / 180;
  return (1 - Math.sin(phiRad)) / (1 + Math.sin(phiRad));
}

// Coulomb earth pressure coefficient (accounts for slope angle)
export function calculateCoulombKa(
  phi: number,     // Soil friction angle (degrees)
  beta: number,    // Slope angle (degrees)
  delta: number = 0 // Wall friction angle (degrees), default smooth
): number {
  const phiRad = (phi * Math.PI) / 180;
  const betaRad = (beta * Math.PI) / 180;
  const deltaRad = (delta * Math.PI) / 180;
  const alphaRad = Math.PI / 2; // Vertical wall (90 degrees)

  // Coulomb formula
  const sinPhiBeta = Math.sin(phiRad + deltaRad);
  const sinPhiAlpha = Math.sin(phiRad - betaRad);
  const sinAlphaDelta = Math.sin(alphaRad - deltaRad);
  const sinAlphaBeta = Math.sin(alphaRad + betaRad);

  const numerator = Math.pow(Math.sin(alphaRad + phiRad), 2);
  const sqrtTerm = Math.sqrt((sinPhiBeta * sinPhiAlpha) / (sinAlphaDelta * sinAlphaBeta));
  const denominator = Math.pow(Math.sin(alphaRad), 2) * sinAlphaDelta * Math.pow(1 + sqrtTerm, 2);

  // Prevent invalid values
  if (beta >= phi || denominator <= 0) {
    // Slope too steep for soil - use Rankine as fallback
    return calculateActiveEarthPressureCoeff(phi);
  }

  return numerator / denominator;
}

export function calculateOverturningFOS(
  wallHeight: number,
  wallThickness: number,
  soilType: string,
  slopeAngle: number = 0
): number {
  const soil = SOIL_PARAMS[soilType];
  if (!soil) return 0;

  // Use Coulomb Ka if slope present, otherwise Rankine
  const Ka = slopeAngle > 0
    ? calculateCoulombKa(soil.frictionAngle, slopeAngle)
    : calculateActiveEarthPressureCoeff(soil.frictionAngle);

  // Active earth pressure resultant (kN/m)
  const Pa = 0.5 * Ka * soil.unitWeight * wallHeight * wallHeight;

  // Overturning moment (Pa acts at H/3 from base) (kN·m/m)
  const Mo = Pa * (wallHeight / 3);

  // Resisting moment (wall weight × moment arm) (kN·m/m)
  const concreteUnitWeight = 24; // kN/m³
  const wallWeight = concreteUnitWeight * wallThickness * wallHeight;
  const Mr = wallWeight * (wallThickness / 2);

  return Mo > 0 ? Mr / Mo : 0;
}

export function calculateSlidingFOS(
  wallHeight: number,
  wallThickness: number,
  soilType: string,
  slopeAngle: number = 0
): number {
  const soil = SOIL_PARAMS[soilType];
  if (!soil) return 0;

  // Use Coulomb Ka if slope present
  const Ka = slopeAngle > 0
    ? calculateCoulombKa(soil.frictionAngle, slopeAngle)
    : calculateActiveEarthPressureCoeff(soil.frictionAngle);

  // Horizontal earth pressure force
  const Pa = 0.5 * Ka * soil.unitWeight * wallHeight * wallHeight;

  // Wall weight
  const concreteUnitWeight = 24;
  const wallWeight = concreteUnitWeight * wallThickness * wallHeight;

  // Friction coefficient (tan of 2/3 friction angle for concrete on soil)
  const mu = Math.tan((2/3 * soil.frictionAngle * Math.PI) / 180);

  // Resisting force (friction + cohesion on base)
  const Fr = wallWeight * mu + soil.cohesion * wallThickness;

  return Pa > 0 ? Fr / Pa : 0;
}

export function calculatePreliminaryWallThickness(
  wallHeight: number,
  soilType: string,
  slopeAngle: number = 0,
  targetFOS: number = 2.0
): number {
  // Iteratively find wall thickness for target overturning FOS
  let thickness = 0.1; // Start at 0.1m
  const maxThickness = wallHeight; // Max reasonable thickness
  const increment = 0.05;

  while (thickness < maxThickness) {
    const fos = calculateOverturningFOS(wallHeight, thickness, soilType, slopeAngle);
    if (fos >= targetFOS) {
      return thickness;
    }
    thickness += increment;
  }

  return maxThickness; // Return max if can't achieve target FOS
}

export function calculateFoundationDepth(
  wallHeight: number,
  soilType: string,
  slopeAngle: number = 0
): number {
  // Rule of thumb: foundation depth = 10-15% of wall height, minimum 0.6m
  // Steeper slopes need deeper foundations
  const soil = SOIL_PARAMS[soilType];
  if (!soil) return 0.6;

  // Base depth factor by soil type
  const baseDepthFactor = soilType === 'rock' ? 0.1 : soilType === 'gravel' ? 0.12 : soilType === 'sand' ? 0.15 : 0.2;

  // Increase for steeper slopes
  const slopeMultiplier = 1 + (slopeAngle / 90) * 0.5; // Up to 50% more for steepest slopes

  return Math.max(0.6, wallHeight * baseDepthFactor * slopeMultiplier);
}
