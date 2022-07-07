import mockRequests from '@/utils/mockRequests.js'
// 获取tabBar的数据
export const tabBarAPI = () => {
  return mockRequests({
    method: 'GET',
    url: '/tabBar'
  })
}
