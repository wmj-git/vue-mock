<template>
  <div class="school-container table-container">
    <el-table
      :data="tableData"
      :border="isBorder"
      :size="size"
      :height="tableHeight"
      :default-selections="defaultSelections"
      style="width: 100%;"
      empty-text="暂无数据"
    >
      <el-table-column
        v-if="isIndex"
        type="index"
        width="50"
        :index="tableIndex"
      />
      <el-table-column
        v-if="isSelection"
        type="selection"
        width="55"
      />
      <el-table-column
        v-for="info in tableHeader"
        :key="info.key"
        :label="info.label"
        :prop="info.key"
        :formatter="formatterFn"
      >
        <template slot-scope="scope">
          <span>
            <!-- 操作按钮 -->
            <span v-if="info.type==='Button'">
              <el-button
                v-for="btn in info.btnList"
                v-if="!btn.isShow || (btn.isShow && btn.isShow(scope.row))"
                :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
                :type="btn.type"
                :size="btn.size || size"
                :icon="btn.icon"
                @click="btn.fn(scope.$index, scope.row)"
              >{{ btn.label }}</el-button>
            </span>
            <!-- 输入框 -->
            <el-input
              v-if="info.type==='Input'"
              v-model="scope.row[info.prop]"
              :size="size"
              @focus="info.focus && info.focus(scope.row)"
            />
            <!-- 下拉框 -->
            <el-select
              v-if="info.type==='Select'"
              v-model="scope.row[info.prop]"
              :size="size"
              :props="info.props"
              @change="info.change && info.change(scope.row)"
            >
              <el-option v-for="op in info.options" :key="op[info.props.value]" :label="op[info.props.label]" :value="op[info.props.value]" />
            </el-select>
            <!-- 复选框 -->
            <el-checkbox-group
              v-if="info.type==='Checkbox'"
              v-model="scope.row[info.prop]"
              @change="info.change && info.change(scope.row)"
            >
              <el-checkbox v-for="ra in info.checkboxs" :label="ra.value">{{ ra.label }}</el-checkbox>
            </el-checkbox-group>
            <!-- 开关 -->
            <el-switch
              v-if="info.type==='Switch'"
              v-model="scope.row[info.prop]"
            />
            <!-- 图像 -->
            <img v-if="info.type==='Image'" :src="scope.row[info.prop]" @click="info.handle && info.handle(scope.row)">
            <!-- 默认 -->
            <span
              v-if="!info.type"
              :style="info.infoStyle && info.infoStyle(scope.row)"
              :class="info.infoClass && info.info.infoClass(scope.row)"
            >{{ (info.formatter && info.formatter(scope.row)) || scope.row[info.prop] }}</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <section v-if="isPagination">
      <Pagination
        :total="listQuery.total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        :hide-on-single-page="pageOne"
        @pagination="handlePaginationChange"
        @current-change="handleCurrentChange"
      />
    </section>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { staticFormatterMap } from '@/utils/formatterMap'

export default {
  props: {
    size: { type: String, default: 'medium' },
    isBorder: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    // 表格上方操作
    isOperate: { type: Boolean, default: true },
    // 是否显示表格复选框
    isSelection: { type: Boolean, default: false },
    defaultSelections: { type: [Array, Object], default: () => null },
    // 是否显示分页
    isPagination: { type: Boolean, default: true },
    // 是否显示表格索引
    isIndex: { type: Boolean, default: false },
    indexLabel: { type: String, default: '序号' },
    operateItem: { type: Array, default: () => [] }, // 表格头部操作
    tableData: { // 表格数据源
      type: Array,
      default: () => []
    },
    tableHeader: { // 表格的字段展示
      type: Array,
      default: () => []
    },
    labelWidth: { type: String },
    // 分页
    listQuery: { type: Object, default: () => ({ limit: 10, page: 1, total: 0 }) }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      system_id: '',
      children: {
        columnBtn: []
      },
      highlight: true,
      tableHeight: window.innerHeight - 240,
      pageOne: false
    }
  },
  watch: {
    /* 'defaultSelections'(val) {
      this.$nextTick(function() {
        if (Array.isArray(val)) {
          val.forEach(row => {
            this.$refs.cesTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.cesTable.toggleRowSelection(val)
        }
      })
    }*/
  },
  created() {
    this.fetchData()
  },
  methods: {
    tableIndex(index) { // 第二页开始表格数据行号不从1开始
      return (this.listQuery.page - 1) * this.listQuery.limit + index + 1
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.infos
        this.listLoading = false
      })
    },
    getList() {},
    handleCurrentChange(val) {
    },
    // 分页改变:改变条数和分页
    handlePaginationChange(res) {
      this.listQuery = res
    },
    // 过滤字段
    formatterFn(row, column) {
      let _val = ''
      const _formatterMap = Object.assign({}, this.formatterMap, staticFormatterMap) // 动态和静态数据求交集
      if (column.property in _formatterMap) {
        _val = _formatterMap[column.property].get(row[column.property])
      } else {
        _val = row[column.property]
      }
      return _val
    }
  }
}
</script>
<style lang="scss" scoped>
  .operateGroup{
  height: 30px;
  }
</style>
