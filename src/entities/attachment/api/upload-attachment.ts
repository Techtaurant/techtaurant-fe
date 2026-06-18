import { uploadFileToPresignedUrl } from '@/entities/attachment/api/upload-file-to-presigned-url';
import type { PresignedUrlRequestReferenceType } from '@/shared/api/generated';
import { issuePresignedUploadUrlApi } from '@/shared/api/generated';

type Params = {
  file?: File | null;
  referenceType: PresignedUrlRequestReferenceType;
};

export const uploadAttachment = async ({ file, referenceType }: Params) => {
  if (!file) return null;

  const { data } = await issuePresignedUploadUrlApi({
    fileName: file.name,
    contentType: file.type,
    fileSize: file.size,
    referenceType,
  });

  if (!data) {
    throw new Error('첨부파일 업로드 URL 발급에 실패했습니다.');
  }

  await uploadFileToPresignedUrl({ presignedUrl: data.presignedUrl, file });

  return data;
};
