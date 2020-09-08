import request from "@/utils/request";

export default {
  //获取课程分页列表
  getPageList(page, limit, searchObj) {
    return request({
      url: `/eduservice/frontcourse/pageCourseList/${page}/${limit}`,
      method: "post",
      data: searchObj
    });
  },
  // 获取课程二级分类
  findAllSubject() {
    return request({
      url: `/eduservice/subject/findAllSubject`,
      method: "get"
    });
  },
  // 获取课程详情
  getCourseInfo(id) {
    return request({
      url: `/eduservice/frontcourse/getCourseInfo/${id}`,
      method: "get"
    });
  }
};
