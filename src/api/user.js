import requests from '../utils/requests'
// 用户相关请求模块

// 用户登录接口
export const login = data => {
  return requests({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 发送短信验证码，注意：每个手机号每分钟仅能发送一次请求
export const sendSms = (mobile) => {
  return requests({
    method: 'GET',
    url: '/v1_0/sms/codes/' + mobile
  })
}

// 获取用户自己的信息
export const getUserInfo = () => {
  return requests({
    method: 'GET',
    url: '/v1_0/user'
  })
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  return requests({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 获取指定用户信息
export const getUserProfile = () => {
  return requests({
    method: 'GET',
    url: 'v1_0/user/profile'
  })
}

// 更新昵称的api
export const updateUserName = data => {
  return requests({
    method: 'PATCH',
    url: 'v1_0/user/profile',
    data
  })
}

/**
 * 添加关注
 */
export const addFollow = userId => {
  return requests({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollow = userId => {
  return requests({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}

/**
 * 点赞
 */
export const addLike = articleId => {
  return requests({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

/**
 * 取消点赞
 */
export const deleteLike = articleId => {
  return requests({
    method: 'DELETE',
    url: `/v1_0/article/likings/${articleId}`
  })
}

/**
 * 收藏文章
 */
export const addCollect = target => {
  return requests({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 */
export const deleteCollect = target => {
  return requests({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
