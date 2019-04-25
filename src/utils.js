

export const normalize = (inputData) => inputData
  .reduce((normalized, item) => ({ ...normalized, [item.id]: item }), {});