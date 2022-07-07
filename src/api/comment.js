import requests from '@/utils/requests'
export const getComments = (params) => {
  return requests({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}
