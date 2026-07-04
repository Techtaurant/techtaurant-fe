export { fetchPostDetail, useGetPostDetail } from '@/entities/post-detail/api/use-get-post-detail';
export {
  getPostDetailMetadataQueryKey,
  prefetchGetPostDetailMetadata,
  useGetPostDetailMetadata,
} from '@/entities/post-detail/api/use-get-post-detail-metadata';
export {
  getPostDetailViewerStateQueryKey,
  useGetPostDetailViewerState,
} from '@/entities/post-detail/api/use-get-post-detail-viewer-state';
export { useRecordPostView } from '@/entities/post-detail/api/use-record-post-view';
export type { PostLikeStatus } from '@/entities/post-detail/api/use-update-post-like-status';
export { POST_LIKE_STATUS, useUpdatePostLikeStatus } from '@/entities/post-detail/api/use-update-post-like-status';
export { useUpdatePostReadStatus } from '@/entities/post-detail/api/use-update-post-read-status';
