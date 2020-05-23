<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          :min="0"
          :max="10"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar+''" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像
        </el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 
        -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + '/eduoss/fileoss/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from "@/api/edu/teacher";
// 引入头像上传组件
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";


export default {
  components: { ImageCropper, PanThumb }, // 声明组件
  data() {
    return {
      teacher: {
        name: "",
        sort: 0,
        level: 1,
        career: "",
        intro: "",
        avatar: 'assets/404_images/default.jpg'
      },
      imagecropperShow: false, // 上传头像弹窗默认不显示
      imagecropperKey: 0, //上传组件key值
      BASE_API: process.env.BASE_API, //获取dev.env.js中的ip和端口号
      saveBtnDisabled: false // 保存按钮是否禁用
    };
  },
  // 监听
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {

    init() {
      // 获取路由中的参数  固定写法
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getTeacherById(id);
      } else {
        // 使用对象拓展运算符，拷贝对象，而不是引用，
        // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
        this.teacher = {};
      }
    },

    // 新增或者修改
    saveOrUpdate() {
      if (!this.teacher.id) {
        this.saveTeacher();
      } else {
        this.updateTeacher();
      }
    },

    // 新增讲师
    saveTeacher() {
      teacherApi
        .saveTeacher(this.teacher)
        .then(response => {
          return this.$message({
            type: "success",
            message: "保存成功!"
          });
        })
        .then(response => {
          // 路由跳转
          this.$router.push({ path: "/teacher/table" });
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: "保存失败"
          });
        });
    },

    // 根据id获取讲师信息
    getTeacherById(id) {
      teacherApi
        .getTeacherById(id)
        .then(response => {
          this.teacher = response.data.teacher;
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: "获取数据失败"
          });
        });
    },

    // 修改讲师
    updateTeacher() {
      teacherApi
        .updateTeacherById(this.teacher)
        .then(response => {
          return this.$message({
            type: "success",
            message: "修改成功"
          });
        })
        .then(response => {
          this.$router.push({ path: "/teacher/table" });
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: "修改失败"
          });
        });
    },

    // 上传头像关闭弹窗
    close() {
      this.imagecropperShow = false,
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    },

    //上传头像成功的回调函数
    cropSuccess(data) {
      this.imagecropperShow = false,
      this.teacher.avatar = data.url,
       // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    }
  }
};
</script>
