<template>
  <div class="table-container">
    <ces-search
      :that="that"
      size="mini"
      label-width="50px"
      :search-data="searchData"
      :search-form="searchForm"
      :search-handle="searchHandle"
    />
    <base-table
      size="mini"
      :is-selection="true"
      :is-index="true"
      :is-pagination="true"
      :is-operate="true"
      :table-data="tableData"
      :table-header="tableHeader"
    />

    <!--弹框-->
    <ces-modal
      width="450px"
      :modal-cfg="modalCfg"
    >
      <ces-edit
        ref="cesEdit"
        :edit-cfg="editForm"
        :edit-data="editData"
        :edit-rules="editRules"
      />
    </ces-modal>
  </div>
</template>
<script>
import cesSearch from '@/components/common/Form/SearchForm'
import BaseTable from '@/components/common/Table/index'
import cesModal from '@/components/common/Modal/Modal'
import cesEdit from '@/components/common/Form/editForm'
import { mapGetters } from 'vuex'
export default {
  name: 'VersionManage',
  components: { BaseTable, cesSearch, cesModal, cesEdit },
  data() {
    return {
      that: this,
      searchData: {},
      searchForm: [],
      editForm: [
        { label: '版本号', prop: 'version', type: 'input', width: '180px' },
        { label: '总开关', prop: 'switchType1', type: 'switch', width: '280px' },
        { label: '地区屏蔽总开关', prop: 'switchType2', type: 'switch', width: '280px' },
        { label: '地区屏蔽误触开关', prop: 'switchType3', type: 'switch', width: '280px' },
        { label: '误触总开关', prop: 'switchType4', type: 'switch', width: '280px' }
      ], // 表单数据
      editData: {
        version: '',
        switchType1: null,
        switchType2: null,
        switchType3: null,
        switchType4: null
      },
      editRules: {},
      modalCfg: { // 弹框
        systemId: 'version_dialog_add',
        visible: false,
        title: '添加版本',
        handles: [
          { label: '取消', type: 'warning', size: 'mini', systemId: 'add_cancel' },
          { label: '添加', type: 'primary', size: 'mini', systemId: 'add_commit' }
        ]
      },
      searchHandle: [{ label: '添加', type: 'primary', systemId: 'version_add' },
        { label: '屏蔽地区设置', type: 'primary', systemId: 'version_config' }],
      tableData: [
        { version: '0.1', switchType1: true }
      ],
      tableHeader: [
        {
          label: '版本号',
          prop: 'version',
          type: ''
        },
        {
          label: '总开关',
          prop: 'switchType1',
          type: 'Switch'
        },
        {
          label: '地区屏蔽总开关',
          prop: 'switchType2',
          type: 'Switch'
        },
        {
          label: '地区屏蔽误触开关',
          prop: 'switchType3',
          type: 'Switch'
        },
        {
          label: '误触总开关',
          prop: 'switchType4',
          type: 'Switch'
        },
        {
          label: '地区屏蔽强互推开关',
          prop: 'switchType5',
          type: 'Switch'
        },
        {
          label: '强互推开关',
          prop: 'switchType6',
          type: 'Switch'
        },
        {
          label: '日志开关',
          prop: 'switchType7',
          type: 'Switch'
        },
        {
          label: '操作',
          type: 'Button',
          btnList: [
            { type: 'danger', label: '删除', handle: row => '' }
          ]
        }
      ]
    }
  },
  computed: {
    /*  ...mapGetters([
          'searchData', 'searchForm', 'searchHandle',
          'loading', 'tableData', 'tableHeader', 'tableHandles', 'tablePage',
          'modalCfg',
          'editForm', 'editData', 'editRules'])*/
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {}
  }

}
</script>
<style></style>
