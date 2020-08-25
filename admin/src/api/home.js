import httpUtil from '@/utils/httpUtil'
// 获取用于echarts展示的数据
export function fetchEcharts (params) {
  return httpUtil({
    url: '/echarts',
    method: 'get',
    params
  })
}