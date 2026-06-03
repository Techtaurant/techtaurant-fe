export const chunkArray = <T>(values: T[], chunkSize: number): T[][] => {
  if (chunkSize <= 0) {
    throw new Error('chunkSize must be greater than 0.');
  }

  const chunks: T[][] = [];

  for (let index = 0; index < values.length; index += chunkSize) {
    chunks.push(values.slice(index, index + chunkSize));
  }

  return chunks;
};
