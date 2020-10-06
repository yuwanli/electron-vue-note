<template>
  <div id="wrapper">
    <el-container class="wrapper">
      <el-header class="header">electron-vue-note</el-header>
      <el-container class="container" ref="container">
        <el-aside width="200px">
          <div
            :class="['item', activeIndex === index && 'item--active']"
            v-for="(item, index) in list"
            v-bind:key="item.id"
            @click="itemClick(item, index)"
          >
            <div class="item__title">{{ item.title || '无标题' }}</div>
            <div class="item__time">{{ item.createTime }}</div>
          </div>
        </el-aside>
        <el-main
          class="main"
          v-loading="editorLoading"
          element-loading-text="初始化中，请稍候..."
        >
          <el-row class="main-title" :gutter="20">
            <el-col :span="20">
              <el-input
                v-model="activeForm.title"
                placeholder="无标题"
                :disabled="!editorStatus"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-button
                @click="editorClick"
                size="mini"
                type="primary"
                :icon="!editorStatus ? 'el-icon-lock' : 'el-icon-unlock'"
                >{{ !editorStatus ? '编辑' : '阅读' }}</el-button
              >
            </el-col>
          </el-row>
          <div class="main-editor">
            <editor
              ref="editor"
              :key="keyId"
              api-key="no-api-key"
              v-model="activeForm.content"
              apiKey="zud1m25dm6rkts6hudlc898crs19h6dfjhy7d6ntqtjbk349"
              @onInit="onInit"
              @onKeyDown="onKeyDown"
              :init="{
                height: editorHeight,
                language: 'zh_CN',
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar: toolbar,
                automatic_uploads: true,
                paste_data_images: true,
                images_upload_url: `http://127.0.0.1:7001/note/upload`,
              }"
            />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import './index.less';
import Editor from '@tinymce/tinymce-vue';
import { debounce } from 'throttle-debounce';
import { getList, updateItem } from '@/api/main';
export default {
  name: 'main',
  components: {
    Editor,
  },
  data() {
    return {
      activeIndex: 0,
      keyId: Date.now(),
      editorHeight: 0,
      editor: null,
      editorStatus: false,
      editorLoading: true,
      toolbar: [
        'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
        'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen',
      ],
      form: {
        title: '无标题',
        content: 'aaa',
      },
      list: [],
    };
  },
  computed: {
    activeForm() {
      return this.list[this.activeIndex] || {};
    },
  },
  async mounted() {
    this.editorHeight =
      this.$refs['container'].$el.getBoundingClientRect().height - 40;
    window.onresize = debounce(300, () => {
      this.keyId = Date.now();
      this.editorHeight =
        this.$refs['container'].$el.getBoundingClientRect().height - 40;
    });
    const res = await getList();
    res.map((item) => {
      const date = new Date(item.createTime);
      item.createTime = `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()}`;
      return item;
    });
    this.list = res;
  },
  methods: {
    editorClick() {
      if (!this.editorStatus) {
        this.editor.focus();
      }
      this.editor.setMode(this.editorStatus ? 'readonly' : 'design');
      this.editorStatus = !this.editorStatus;
    },
    itemClick(item, index) {
      if (index === this.activeIndex) {
        return;
      }
      this.activeIndex = index;
    },
    onInit(event, editor) {
      this.editor = editor;
      this.editor.setMode('readonly');
      this.editorLoading = false;
    },
    async onKeyDown(event) {
      if (event.keyCode === 83 && (event.ctrlKey || event.metaKey)) {
        console.log('>>> save', this.activeForm);
        this.activeForm.updateTime = Date.now();
        await updateItem(this.activeForm);
      }
    },
  },
};
</script>
