import request from '@/utils/request'

export default {
  getList() {
    return request({
      url: `/educms/frontbanner/getAllBanner`,
      method: 'get'
    })
  }
}