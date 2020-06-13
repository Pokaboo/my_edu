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
  },
  findCoursePublishInfo(courseId) {
    return request({
      url: `/eduservice/course/findCoursePublishInfo/${courseId}`,
      method: "get"
    });
  },
  publishCourse(courseId) {
    return request({
      url: `/eduservice/course/publishCourse/${courseId}`,
      method: "post"
    });
  },
  // 根据条件获取课程列表
  pageQuery(current, limit, courseQuery) {
    return request({
      url: `/eduservice/course/pageQuery/${current}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },
  removeCourse(courseId){
    return request({
      url: `/eduservice/course/removeCourse/${courseId}`,
      method: "delete"
    });
  },
  
};
