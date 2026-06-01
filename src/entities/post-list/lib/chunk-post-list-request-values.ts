const POST_LIST_REQUEST_BATCH_SIZE = 100;

export const chunkPostListRequestValues = <T>(values: T[]): T[][] => {
  const chunks: T[][] = [];

  for (let index = 0; index < values.length; index += POST_LIST_REQUEST_BATCH_SIZE) {
    chunks.push(values.slice(index, index + POST_LIST_REQUEST_BATCH_SIZE));
  }

  return chunks;
};
