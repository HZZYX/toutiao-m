import requests from '../utils/requests'

/*
  获取频道的文章列表
 */
export const getArticles = params => {
  return requests({
    method: 'GET',
    url: '/v1_0/articles',
    params
    // params 选项来配置 Query 参数
  })
}

export const getArticleDetail = (id) => {
  return requests({
    url: '/v1_0/articles/' + id,
    method: 'GET'
  })
}
