<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px;"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>
      <!-- 课程讲师 TODO -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" :rows="5" type="textarea" />
      </el-form-item>

      <!-- 课程封面 TODO -->

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";

const defaultForm = {
  title: "",
  subjectId: "",
  teacherId: "",
  lessonNum: 0,
  description: "",
  cover: "",
  price: 0
};

export default {
  data() {
    return {
      courseInfo: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用
      teacherList: [],
      subjectOneList: [],
      subjectTwoList: []
    };
  },

  created() {
    this.findAllEduTeacher();
    this.getAllSubject();
  },

  methods: {
    // 课程分类二级联动
    subjectLevelOneChanged(value) {
      for (let index = 0; index < this.subjectOneList.length; index++) {
        if (this.subjectOneList[index].id === value) {
          this.subjectTwoList = this.subjectOneList[index].children;
          this.courseInfo.subjectId = "";
        }
      }
    },

    // 获取所有的一级分类
    getAllSubject() {
      subject
        .getAllSubject()
        .then(response => {
          this.subjectOneList = response.data.subjects;
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: "系统异常!"
          });
        });
    },
    // 查询所有的讲师
    findAllEduTeacher() {
      course
        .findAllEduTeacher()
        .then(response => {
          this.teacherList = response.data.items;
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: "系统异常!"
          });
        });
    },

    // 保存并且下一步
    saveOrUpdate() {
      course
        .addCourseInfo(this.courseInfo)
        .then(response => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.$router.push({
            path: "/course/chapter/" + response.data.courseId
          });
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: "保存失败!"
          });
        });
    }
  }
};
</script>
