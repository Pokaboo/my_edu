import request from '@/utils/request'

export default {

  createStatistics(day) {
    return request({
      url: `/staservice/sta/countregister/${day}`,
      method: 'post'
    })
  },
  showChart(searchObj) {
    return request({
      url: `/staservice/sta/show-chart/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
      method: 'get'
    })
  },
}