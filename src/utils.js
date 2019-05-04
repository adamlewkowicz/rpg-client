

export const normalize = (inputData) => inputData
  .reduce((normalized, item) => ({ ...normalized, [item.id]: item }), {});

  
export const isNearTo = (sourceX, sourceY, targetX, targetY) => {
  const xDiff = sourceX - targetX;
  const yDiff = sourceY - targetY;

  if (xDiff >= -1 && xDiff <= 1 && yDiff >= -1 && yDiff <= 1) {
    return true;
  }
  return false;
}