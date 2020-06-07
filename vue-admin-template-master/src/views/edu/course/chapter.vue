<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 40px;"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>
    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterList" :key="chapter.id">
        <p>
          {{ chapter.title }}

          <span class="acts">
            <el-button type="text" @click="openVideoDialog(chapter.id)"
              >添加课时</el-button
            >
            <el-button style="" type="text" @click="openChapterEdit(chapter.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="removeChapter(chapter.id)"
              >删除</el-button
            >
          </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button type="text" @click="openEditVideo(video.id)"
                  >编辑</el-button
                >
                <el-button type="text" @click="deleteVideo(video.id)"
                  >删除</el-button
                >
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
        >下一步</el-button
      >
    </div>
    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number
            v-model="chapter.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number
            v-model="video.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button
          :disabled="saveVideoBtnDisabled"
          type="primary"
          @click="saveOrUpdateVideo"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import chapter from "@/api/edu/chapter";
import video from "@/api/edu/video";

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      chapterList: [],
      courseId: "",
      dialogChapterFormVisible: false,
      chapter: {
        title: "",
        sort: 0
      },
      dialogVideoFormVisible: false, // 是否显示课时表单
      saveVideoBtnDisabled:false,
      chapterId: "", // 课时所在的章节id
      video: {
        // 课时对象
        title: "",
        sort: 0,
        free: 0,
        videoSourceId: ""
      }
    };
  },

  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.findAllChapterInfo();
    }
    this.chapter = {
      title: "",
      sort: 0
    };
  },

  methods: {
    // *******************************课时信息管理****************************
    // 添加课时弹框
    openVideoDialog(chapterId) {
      this.saveVideoBtnDisabled = false
      this.dialogVideoFormVisible = true;
      this.video = {
        title: "",
        sort: 0,
        free: 0,
        videoSourceId: ""
      };
      this.video.chapterId = chapterId
    },
    // 新增课时信息
    saveVideo() {
      this.video.courseId = this.courseId
      video
        .saveVideo(this.video)
        .then(response => {
          this.$message({
            type: "success",
            message: "添加课时成功!"
          });
          this.dialogVideoFormVisible = false
          this.findAllChapterInfo();
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: "添加课时失败!"
          });
        });
    },

    // 编辑课时信息弹框数据回显
    openEditVideo(id) {
      this.dialogVideoFormVisible = true;
      video.findEduVideo(id).then(response => {
        this.video = response.data.video;
      });
    },

    // 修改课时信息
    updateVideo() {
      video
        .updateEduVideo(this.video)
        .then(response => {
          this.$message({
            type: "success",
            message: "修改课时成功!"
          });
          this.dialogVideoFormVisible = false
          this.findAllChapterInfo();
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: "修改课时失败!"
          });
        });
    },
    // 删除课时信息
    deleteVideo(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return video.deleteEduVideo(id);
        })
        .then(() => {
          this.findAllChapterInfo();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(response => {
          // 失败
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败"
            });
          }
        });
    },

    // 新增或修改课时信息
    saveOrUpdateVideo() {
      this.saveVideoBtnDisabled = false;
      if (!this.video.id) {
        this.saveVideo();
      } else {
        this.updateVideo();
      }
    },
    // *******************************章节信息管理****************************
    // 删除章节
    removeChapter(chapterId) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return chapter.deleteChapter(chapterId);
        })
        .then(() => {
          this.findAllChapterInfo();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(response => {
          // 失败
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败"
            });
          }
        });
    },
    // 新增章节弹框
    openChapterDialog() {
      this.dialogChapterFormVisible = true;
      this.chapter = {
        title: "",
        sort: 0
      };
    },
    // 修改章节弹框数据回显
    openChapterEdit(chapterId) {
      this.dialogChapterFormVisible = true;
      chapter.findChapter(chapterId).then(response => {
        this.chapter = response.data.eduChapter;
      });
    },

    // 保存或者修改章节信息
    saveOrUpdate() {
      this.saveBtnDisabled = true;
      if (!this.chapter.id) {
        this.addChapter();
      } else {
        this.updateData();
      }
    },
    // 修改章节信息
    updateData() {
      chapter
        .updateChapter(this.chapter)
        .then(response => {
          this.dialogChapterFormVisible = false;
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.findAllChapterInfo();
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: "修改失败!"
          });
        });
    },

    // 新增章节信息
    addChapter() {
      this.chapter.courseId = this.courseId;
      chapter
        .addChapter(this.chapter)
        .then(response => {
          this.dialogChapterFormVisible = false;
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.findAllChapterInfo();
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: "添加失败!"
          });
        });
    },

    // 获取所有的章节和小节信息
    findAllChapterInfo() {
      chapter
        .findAllChapterInfo(this.courseId)
        .then(response => {
          this.chapterList = response.data.chapterList;
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: "系统异常!"
          });
        });
    },

    // 上一步
    previous() {
      console.log("previous");
      this.$router.push({ path: "/course/info/" + this.courseId });
    },
    //下一步
    next() {
      console.log("next");
      this.$router.push({ path: "/course/publish/" + this.courseId });
    }
  }
};
</script>
// scoped表示只对当前页生效
<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>
