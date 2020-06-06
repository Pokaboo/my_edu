import request from '@/utils/request'

export default {
  // 根据条件获取讲师列表
  findAllChapterInfo(courseId) {
    return request({
      url: `/eduservice/chapter/findAllChapterInfo/${courseId}`,
      method: 'get',
    })
  }
}


