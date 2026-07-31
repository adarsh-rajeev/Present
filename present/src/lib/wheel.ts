export interface Point {
  x: number;
  y: number;
}

function round(value: number) {
  return Number(value.toFixed(3));
}

export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angle: number
): Point {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: round(cx + radius * Math.cos(radians)),
    y: round(cy + radius * Math.sin(radians)),
  };
}

/**
 * Creates a donut (ring) segment instead of a pie slice.
 */
export function describeDonutSlice(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number
) {
  const outerStart = polarToCartesian(
    cx,
    cy,
    outerRadius,
    startAngle
  );

  const outerEnd = polarToCartesian(
    cx,
    cy,
    outerRadius,
    endAngle
  );

  const innerEnd = polarToCartesian(
    cx,
    cy,
    innerRadius,
    endAngle
  );

  const innerStart = polarToCartesian(
    cx,
    cy,
    innerRadius,
    startAngle
  );

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `
    M ${outerStart.x} ${outerStart.y}
    A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}
    L ${innerEnd.x} ${innerEnd.y}
    A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}
    Z
  `;
}

/**
 * Position labels halfway inside each segment.
 */
export function getTextPosition(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
) {
  const angle = (startAngle + endAngle) / 2;

  const radius = (innerRadius + outerRadius) / 2;

  return polarToCartesian(
    cx,
    cy,
    radius,
    angle
  );
}