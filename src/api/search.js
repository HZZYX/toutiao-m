import requests from '@/utils/requests.js'

export const getSuggestion = (q) => {
  return requests({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}

export const getResult = (params) => {
  return requests({
    url: '/v1_0/search',
    method: 'get',
    params
  })
}
