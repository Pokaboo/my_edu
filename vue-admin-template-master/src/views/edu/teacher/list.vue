<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="名称"
        width="80"
        align="center" />

      <el-table-column
        label="头衔"
        width="80"
        align="center">
        <!--  slot-scope="scope" 来取得作用域插槽:data绑定的数据 -->
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column>

      <el-table-column
        prop="intro"
        label="资历"
        align="center" />

      <el-table-column
        prop="gmtCreate"
        label="添加时间"
        width="160"
        align="center" />

      <el-table-column
        prop="sort"
        label="排序"
        width="60"
        align="center" />

      <el-table-column
        label="操作"
        width="200"
        align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/' + scope.row.id">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getTeacherListPage" />
  </div>
</template>

<script>
import teacher from '@/api/edu/teacher'
export default {
  // data:{

  // },
  // 定义变量和初始值
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      teacherQuery: {} // 条件封装对象
    }
  },
  // 页面渲染之前调用，一般调用methods中的方法
  created() {
    this.getTeacherListPage()
  },
  // 创建具体的方法，调用teacher.js中方法
  methods: {
    getTeacherListPage(page = 1) {
      this.page = page
      this.listLoading = true
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then(response => {
          console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
        })
        .catch(err => {
          console.log(err)
        })
      this.listLoading = false
    }
  }
}
</script>
