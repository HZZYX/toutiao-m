// 先引入mockjs模块
import Mock from 'mockjs'
/*
    把JSON数据格式引入进来
    JSON数据格式根本没有对外暴露，但是可以引入
    webpack默认对外暴露的模块有：图片、JSON数据格式
*/
import tabBar from './tabBar.json'

// mock数据：第一个参数请求地址，第二个参数：请求数据
// 模拟tabBar的数据
Mock.mock('/mock/tabBar', {
  code: 200,
  data: tabBar
})

// mockServe.js文件在入口文件中引入（至少需要执行一次，才能模拟数据）
