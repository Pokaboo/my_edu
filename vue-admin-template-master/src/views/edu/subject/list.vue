<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="输入关键字检索"
      style="margin-bottom:30px;"
    />

    <el-tree
      ref="tree2"
      :data="subjects"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script>
import subject from "@/api/edu/subject";

export default {
  data() {
    return {
      filterText: "",
      subjects: [],
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    this.getAllSubject()
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    getAllSubject() {
      subject.getAllSubject()
        .then(response => {
          this.subjects = response.data.subjects
        })
        .catch(err => {
          console.log(err)
        });
    }
  }
};
</script>
