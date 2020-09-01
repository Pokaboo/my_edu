import request from '@/utils/request'

export default {
  //获取讲师分页列表
  getPageList(page, limit) {  
    return request({
      url: `/eduservice/frontTeacher/pageList/${page}/${limit}`,
      method: 'get'
    })
  },
  // 获取讲师基本信息
  getTeacherInfo(id) {  
    return request({
      url: `/eduservice/frontTeacher/getTeacherInfo/${id}`,
      method: 'get'
    })
  }
}