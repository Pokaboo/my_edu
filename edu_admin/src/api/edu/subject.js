import request from '@/utils/request'

export default {
  // 根据条件获取讲师列表
  getAllSubject() {
    return request({
      url: `/eduservice/subject/findAllSubject`,
      method: 'get',
    })
  }
}


