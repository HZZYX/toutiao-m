import requests from '@/utils/requests.js'

export const getAllChannels = () => {
  return requests({
    url: '/v1_0/channels',
    method: 'GET'
  })
}

export const updateChannels = (data) => {
  return requests({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data
  })
}
