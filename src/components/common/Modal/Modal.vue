<!--
<template>
  <transition name="el-fade-in">
    <div v-if="modalCfg.visible" style="width:100%;height:100%;position:fixed;top:0px;left:0px;z-index:8;">
      &lt;!&ndash; 遮罩 &ndash;&gt;
      <div class="ces-mask" />
      <div class="ces-modal-wrap">
        <div class="ces-modal" :style="{width:width}">
          &lt;!&ndash; 标题头部 &ndash;&gt;
          <section v-if="isHeader" style="padding:10px;border-bottom: solid 1px #f1f1f1;">
            <div class="ces-modal__header">
              <div>{{ modalCfg.title }}</div>
              <i class="el-icon-close ces-modal-close" @click="modalCfg.close(that)" />
            </div>
          </section>
          &lt;!&ndash; body &ndash;&gt;
          <section v-loading="modalLoading" class="ces-modal__body" style="padding:10px;">
            <slot />
          </section>
          &lt;!&ndash; 操作底部 &ndash;&gt;
          <section v-if="isHandle" style="padding:10px;border-top: solid 1px #f1f1f1;">
            <div class="ces-modal__footer">
              <span>
                <el-button
                  v-for="item in modalCfg.handles"
                  :key="item.label"
                  :type="item.type"
                  :icon="item.icon"
                  :size="item.size"
                  :disabled="item.disabled"
                  @click="item.handle(that)"
                >{{ item.label }}</el-button>
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {

  props: {
    that: { type: Object, default: this },
    modalCfg: {
      visible: false,
      title: '',
      handles: []
    },
    width: {
      type: String,
      default: '50%'
    },
    isHeader: {
      type: Boolean,
      default: true
    },
    modalLoading: {
      type: Boolean,
      default: false
    },
    isHandle: {
      type: Boolean,
      default: true
    }

  },
  computed: {

  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
-->
<template>
  <div class="emDialog-container">
    <el-dialog
      :systemId="modalCfg.systemId"
      :title="modalCfg.title"
      :modal-append-to-body="false"
      :visible.sync="modalCfg.visible"
    >
      <slot />
      <div slot="footer" class="dialog-footer">
        <template v-for="(btn, _index ) in modalCfg.handles">
          <el-button
            :key="_index"
            :system-id="btn.systemId"
            class="em-btn-operation table_inLine_btn"
            size="mini"
            :icon="btn.icon"
            :type="btn.type"
            @click="() => btn.systemId.includes('cancel') ? dialogHide() : operateData()"
          >
            {{ btn.label }}
          </el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import bus from '@/layout/components/bus.js'
export default {
  props: {
    that: { type: Object, default: this },
    modalCfg: {
      visible: true,
      title: '',
      handles: [],
      systemId: ''
    },
    width: {
      type: String,
      default: '50%'
    },
    isHeader: {
      type: Boolean,
      default: true
    },
    modalLoading: {
      type: Boolean,
      default: false
    },
    isHandle: {
      type: Boolean,
      default: true
    },
    systemId: { type: String, default: '' }
  },
  computed: {

  },
  created() {
    bus.$on('dialogShow', val => {
      this.modalCfg.visible = val
    })
  },
  methods: {
    close() {
      this.$emit('close')
    },
    dialogHide() {
      this.modalCfg.visible = false
    },
    operateData() {
      console.log('执行了操作数据按钮', this.modalCfg.handles)
      this.modalCfg.handles.forEach(val => {
        switch (val.systemId) {
          case 'add_commit': // 添加数据
            break
          case 'edit_commit': // 编辑数据
            break
        }
      })
    }
  }
}
</script>
