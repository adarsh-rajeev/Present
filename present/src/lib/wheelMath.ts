export const TAU = Math.PI * 2;

export function normalizeRadians(angle: number) {
  const normalized = angle % TAU;

  return normalized < 0 ? normalized + TAU : normalized;
}

export function getSliceAngle(total: number) {
  if (total <= 0) {
    return 0;
  }

  return TAU / total;
}

export function getSliceStartAngle(
  index: number,
  total: number,
) {
  return index * getSliceAngle(total);
}

export function getSliceCenterAngle(
  index: number,
  total: number,
) {
  return getSliceStartAngle(index, total) + getSliceAngle(total) / 2;
}

export function getAlignedWheelRotation(
  winnerIndex: number,
  total: number,
) {
  return normalizeRadians(
    -getSliceCenterAngle(winnerIndex, total),
  );
}

export function getWheelTargetRotation(
  currentRotation: number,
  winnerIndex: number,
  total: number,
  extraTurns: number,
) {
  const current = normalizeRadians(currentRotation);
  const alignedRotation = getAlignedWheelRotation(
    winnerIndex,
    total,
  );

  const forwardDelta = normalizeRadians(
    alignedRotation - current,
  );

  return current + extraTurns * TAU + forwardDelta;
}