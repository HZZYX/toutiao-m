import requests from '@/utils/requests'

export const getComments = (params) => {
  return requests({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}

/**
 * 对评论或评论回复点赞
 */
export function addCommentLike (commentId) {
  return requests({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

/**
 * 取消对评论或评论回复点赞
 */
export function deleteCommentLike (commentId) {
  return requests({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${commentId}`
  })
}

/**
 * 添加评论或评论回复
 */
export function addComment (data) {
  return requests({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
