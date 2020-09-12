import request from '@/utils/request'

export default {
  //获取视频凭证
  getPlayAuth(vid) {  
    return request({
      url: `/eduvod/video/get-play-auth/${vid}`,
      method: 'get'
    })
  }
}