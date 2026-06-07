type Params = {
  presignedUrl: string;
  file: File;
};

export const uploadFileToPresignedUrl = async ({ presignedUrl, file }: Params) => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': file.type },
  });

  if (!response.ok) {
    throw new Error('첨부파일 업로드에 실패했습니다.');
  }
};
