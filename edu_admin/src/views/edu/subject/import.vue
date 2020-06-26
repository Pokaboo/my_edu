<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-button :plain="true" size="medium" @click="explainExcel"
          >excel模版说明</el-button
        >
        <el-tag>
          <i class="el-icon-download" />
          <a
            :href="
              OSS_PATH +
                '/excel%E6%A8%A1%E6%9D%BF/%E8%AF%BE%E7%A8%8B%E5%88%86%E7%B1%BB%E6%A8%A1%E6%9D%BF.xlsx'
            "
            >点击下载模版</a
          >
        </el-tag>
      </el-form-item>

      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API + '/eduservice/subject/addSubject'"
          name="file"
          accept="application/vnd.ms-excel"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
            >{{ fileUploadBtnText }}</el-button
          >
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      BASE_API: process.env.BASE_API, // 接口API地址
      OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
      fileUploadBtnText: "上传到服务器", // 按钮文字
      importBtnDisabled: false, // 按钮是否禁用,

      loading: false
    };
  },
  methods: {
    submitUpload() {
      this.fileUploadBtnText = "正在上传";
      this.importBtnDisabled = true;
      this.loading = true;
      // 表单提交
      this.$refs.upload.submit();
    },

    // 上传成功
    fileUploadSuccess(response) {
      if (response.success == true) {
        this.fileUploadBtnText = "导入成功";
        this.loading = false;
        this.$message({
          type: "success",
          message: "课程分类导入成功"
        });
        this.$router.push({ path: "/subject/list" });
      }
    },
    // 上传失败
    fileUploadError(response) {
      this.fileUploadBtnText = "导入失败";
      this.loading = false;
      this.$message({
        type: "success",
        message: "课程分类导入失败"
      });
    },
    // excel模板说明
    explainExcel() {
      this.$message("请先下载模板录入课程分类后导入Excel");
    }
  }
};
</script>
