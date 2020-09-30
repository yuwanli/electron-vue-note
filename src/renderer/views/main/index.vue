<template>
  <div id="wrapper">
    <el-container>
      <el-header>electron-vue-note</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main class="main">
          <editor
            api-key="no-api-key"
            v-model="form.content"
            apiKey="zud1m25dm6rkts6hudlc898crs19h6dfjhy7d6ntqtjbk349"
            :init="{
              height: 500,
              language: 'zh_CN',
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar: toolbar,
            }"
          />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
export default {
  name: 'main',
  components: {
    Editor,
  },
  data() {
    return {
      toolbar: [
        'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
        'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen',
      ],
      form: {
        content: '',
      },
    };
  },
  mounted() {},
  methods: {
    open() {},
  },
};
</script>

<style>
#wrapper {
  position: absolute;
  min-height: 100%;
  left: 0;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-container {
  flex: 1;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 100%;
  overflow: auto;
}
.main {
  padding: 0;
  height: 100%;
}
.editor {
  height: 100%;
}
</style>
