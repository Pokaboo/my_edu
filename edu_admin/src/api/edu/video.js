import request from "@/utils/request";

export default {
  // 添加课时
  saveVideo(video) {
    return request({
      url: `/eduservice/video/saveVideo`,
      method: "post",
      data: video
    });
  },

  // 修改章节
  updateEduVideo(video) {
    return request({
      url: `/eduservice/video/updateEduVideo`,
      method: "post",
      data: video
    });
  },
  // 删除章节
  deleteEduVideo(id) {
    return request({
      url: `/eduservice/video/${id}`,
      method: "delete"
    });
  },
  // 根据id获取课时信息
  findEduVideo(id) {
    return request({
      url: `/eduservice/video/findEduVideo/${id}`,
      method: "get"
    });
  },
  // 删除视频
  removeVideo(id) {
    return request({
      url: `/eduvod/video/removeVideo/${id}`,
      method: "delete"
    });
  }
};
