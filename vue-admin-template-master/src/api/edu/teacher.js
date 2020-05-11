import request from '@/utils/request'

export default {
  // 根据条件获取讲师列表
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/edu-teacher/pageTheacherByConditons/${current}/${limit}`,
      method: 'post',
      // data 表示把对象转json 传递 或者使用param{}
      data: teacherQuery
    })
  },
  // 删除
  removeById(teacherId) {
    return request({
      url: `/eduservice/edu-teacher/${teacherId}`,
      method: 'delete'
    })
  },
  // 新增讲师
  saveTeacher(eduTeacher) {
    return request({
      url: `/eduservice/edu-teacher/addTeacher`,
      method: 'post',
      data: eduTeacher
    })
  },
  getTeacherById(id) {
    return request({
      url: `/eduservice/edu-teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  updateTeacherById(eduTeacher) {
    return request({
      url: `/eduservice/edu-teacher/updateTeacher/${eduTeacher.id}`,
      method: 'post',
      data: eduTeacher
    })
  }
}

// export function getList(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }
