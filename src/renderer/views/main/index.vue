<template>
  <div id="wrapper" @click="wrapperClick">
    <el-container class="wrapper">
      <el-header class="header">
        <el-button
          @click="createClick"
          type="primary"
          size="mini"
          icon="el-icon-document-add"
          >新建笔记</el-button
        >
        <p>electron-vue-note</p>
        <div class="header-avatar">
          <el-avatar
            size="small"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
          <p class="header-avatar__name">13307175141</p>
        </div>
      </el-header>
      <el-container class="container" ref="container">
        <el-aside class="aside" width="200px">
          <div
            :class="['item', activeIndex === index && 'item--active']"
            v-for="(item, index) in list"
            v-bind:key="item.id"
            @mousedown="mousedown($event, item, index)"
            @click="itemClick(item, index)"
          >
            <div class="item__title">{{ item.title || "无标题" }}</div>
            <div class="item__time">{{ item.createTimeShow }}</div>
          </div>
        </el-aside>
        <el-main
          @click="wrapperClick"
          class="main"
          v-loading="editorLoading"
          element-loading-text="初始化中，请稍候..."
        >
          <el-row class="main-title" :gutter="20">
            <el-col :span="20">
              <el-input
                ref="title"
                v-model="activeForm.title"
                placeholder="无标题"
                @keydown.native="onKeyDown"
                :disabled="!editorStatus"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-button
                @click="editorClick"
                size="mini"
                type="primary"
                :icon="!editorStatus ? 'el-icon-edit' : 'el-icon-lock'"
                >{{ !editorStatus ? "编辑" : "保存" }}</el-button
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
      <div class="menu" @click.stop :style="menuStyle">
        <div class="menu__item" @click="deleteClick">
          <i class="icon el-icon-folder-delete"></i>删除
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import "./index.less";
import Editor from "@tinymce/tinymce-vue";
import { debounce } from "throttle-debounce";
import {
  getList,
  updateItem,
  getItem,
  createItem,
  deleteItem,
} from "@/api/main";
export default {
  name: "main",
  components: {
    Editor,
  },
  data() {
    return {
      menuStyle: {},
      activeIndex: 0,
      keyId: Date.now(),
      editorHeight: 0,
      editor: null,
      editorStatus: false,
      editorLoading: true,
      toolbar: [
        "searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample",
        "hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen",
      ],
      form: {
        title: "无标题",
        content: "",
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
      this.$refs["container"].$el.getBoundingClientRect().height - 40;
    window.onresize = debounce(300, () => {
      this.keyId = Date.now();
      this.editorHeight =
        this.$refs["container"].$el.getBoundingClientRect().height - 40;
    });
    const res = await getList();
    this.list = res;
  },
  methods: {
    wrapperClick() {
      this.menuStyle = {
        display: "none",
      };
    },
    mousedown(event, item, index) {
      if (event.which === 3) {
        this.menuStyle = {
          left: event.clientX + "px",
          top: event.clientY + "px",
          display: "block",
        };
        this.itemClick(item, index);
      }
    },
    async deleteClick() {
      await deleteItem(this.activeForm.id);
      this.list.splice(this.activeIndex, 1);
      this.wrapperClick();
    },
    async createClick() {
      const res = await createItem();
      res.content = " ";
      this.list.unshift(res);
      this.activeIndex = 0;
      this.$nextTick(() => {
        this.editorStatus = true;
        this.editor.focus();
        this.editor.setMode("design");
      });
    },
    async editorClick() {
      if (!this.editorStatus) {
        this.editor.focus();
      } else {
        this.activeForm.updateTime = Date.now();
        await updateItem(this.activeForm);
      }
      this.editor.setMode(this.editorStatus ? "readonly" : "design");
      this.editorStatus = !this.editorStatus;
    },
    async itemClick(item, index) {
      if (index === this.activeIndex) {
        return;
      }
      this.activeIndex = index;
      this.editor.setMode("readonly");
      this.editorStatus = false;
      const res = await getItem(item.id);
      this.list[index] = res;
    },
    onInit(event, editor) {
      this.editor = editor;
      this.editor.setMode("readonly");
      this.editorLoading = false;
    },
    async onKeyDown(event) {
      if (event.keyCode === 83 && (event.ctrlKey || event.metaKey)) {
        this.activeForm.updateTime = Date.now();
        await updateItem(this.activeForm);
      }
    },
  },
};
</script>
