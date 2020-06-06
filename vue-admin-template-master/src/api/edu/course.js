import request from "@/utils/request";

const api_name = "/admin/edu/course";

export default {
  addCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course/addCourseInfo`,
      method: "post",
      data: courseInfo
    });
  },
  // 根据条件获取讲师列表
  findAllEduTeacher() {
    return request({
      url: `/eduservice/edu-teacher/findAll`,
      method: "get"
    });
  },
  // 根据id获取课程信息
  findCourseInfoById(courseId) {
    return request({
      url: `/eduservice/course/findCourseInfoById/${courseId}`,
      method: "get"
    });
  },
  // 根据条件获取讲师列表
  updateCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course/updateCourseInfo`,
      method: "post",
      data: courseInfo
    });
  }
};
