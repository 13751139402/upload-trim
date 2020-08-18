<template>
  <div>
    <div class="upload" @click="handleClick">
      <svg-icon icon="21"></svg-icon>
      <input ref="input" type="file" class="upload-file" @change="handleChange" />
    </div>
    <upload-trim :visibled.sync="dialogVisibled" :trimWidth="trimWidth" :trimHeight="trimHeight" :file="file"></upload-trim>
  </div>
</template>

<script>
import uploadTrim from "./uploadTrim";
export default {
  name: "HelloWorld",
  components: {
    uploadTrim,
  },
  props: {
    msg: String,
    trimWidth:Number,
    trimHeight:Number,
  },
  data() {
    return {
      dialogVisibled: false,
      file:false
    };
  },
  methods: {
    handleClick() {
      const input = this.$refs.input;
      input.value = "";
      input.click();
    },
    handleChange(file) {
      this.file=Object.freeze(file);
      this.dialogVisibled=true;
    },
  },
};
</script>

<style lang="scss" scoped>
.upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  width: 178px;
  height: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    border: 1px dashed #409eff;
  }
  .upload-file {
    display: none;
  }
  #loading {
    margin: 0 auto;
    width: 70px;
    height: 120px;
  }
  .loading {
    width: 10px;
    height: 120px;
    float: left;
    margin: 2px;
    background-color: #00ff00;
    animation: loading 1s infinite ease-in-out; /*animation：动画名称 持续时间 动画速度曲线 延迟 执行多少次 是否正反方向轮流播放*/
  }
  .loading2 {
    animation-delay: -0.9s; /*定义开始执行的地方，负号表示直接从第900ms开始执行*/
  }
  .loading3 {
    animation-delay: -0.8s;
  }
  .loading4 {
    animation-delay: -0.7s;
  }
  .loading5 {
    animation-delay: -0.6s;
  }
  @keyframes loading {
    0%,
    40%,
    100% {
      /*定义每帧的动作*/
      -webkit-transform: scaleY(0.5);
    }
    20% {
      -webkit-transform: scaleY(1);
    }
  }
}
</style>