<template>
  <div class="ces-main">
    <!-- 搜索 -->
    <ces-search
      :that="that"
      size="mini"
      label-width="50px"
      :search-data="searchData"
      :search-form="searchForm"
      :search-handle="searchHandle"
    />

    <!-- 操作表格 -->
    <ces-table
      :that="that"
      size="mini"
      :is-selection="true"
      :is-index="true"
      :is-pagination="true"
      :is-handle="true"
      :table-data="tableData"
      :table-cols="tableCols"
      :table-handles="tableHandles"
      :table-page="tablePage"
    />

    <!-- 弹窗 -->
    <ces-modal
      width="450px"
      :that="that"
      :modal-cfg="modalCfg"
    >
      <ces-edit
        ref="cesEdit"
        :that="that"
        :edit-cfg="editForm"
        :edit-data="editData"
        :edit-rules="editRules"
      />
    </ces-modal>
  </div>
</template>

<script>
import cesSearch from '@/components/common/Form/searchForm'
import cesTable from '@/components/common/Table/Table'
import cesModal from '@/components/common/Modal/Modal'
import cesEdit from '@/components/common/Form/operateForm'

export default {
  components: {
    cesTable,
    cesSearch,
    cesModal,
    cesEdit
  },
  data() {
    return {
      that: this
    }
  },
  computed: {},
  methods: {
  }
}
</script>

<style>

</style>
