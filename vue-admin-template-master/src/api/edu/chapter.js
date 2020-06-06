import request from "@/utils/request";

export default {
  // 根据条件获取章节信息
  findAllChapterInfo(courseId) {
    return request({
      url: `/eduservice/chapter/findAllChapterInfo/${courseId}`,
      method: "get"
    });
  },

  // 添加章节
  addChapter(chapter) {
    return request({
      url: `/eduservice/chapter/addChapter`,
      method: "post",
      data: chapter
    });
  },

  // 修改章节
  updateChapter(chapter) {
    return request({
      url: `/eduservice/chapter/updateChapter`,
      method: "post",
      data: chapter
    });
  },

  // 根据id获取章节信息
  findChapter(chapterId) {
    return request({
      url: `/eduservice/chapter/findChapter/${chapterId}`,
      method: "get"
    });
  },

  // 删除章节
  deleteChapter(chapterId) {
    return request({
      url: `/eduservice/chapter/deleteChapter/${chapterId}`,
      method: "delete"
    });
  }
};
