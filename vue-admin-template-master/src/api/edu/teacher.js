import request from "@/utils/request";

export default {
  // 根据条件获取讲师列表
  getTeacherListPage (current, limit, teacherQuery) {
    return request({
      url: `/eduservice/edu-teacher/pageTheacherByConditons/${current}/${limit}`,
      method: "post",
      // data 表示把对象转json 传递 或者使用param{}
      data: teacherQuery
    });
  }
};

// export function getList(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }
