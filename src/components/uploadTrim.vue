<template>
  <div id="upload-trim" v-if="isVisibled">
    <div class="dialog-wrap">
      <div class="dialog-close" @click="isVisibled=false">
        <svg-icon icon="21"></svg-icon>
      </div>
      <div class="dialog-contant">
        <div class="modal-trim">
          <canvas
            id="trim"
            ref="canvasRef"
            width="300"
            height="300"
            @mousemove="handleMouseMoveCanvas"
          ></canvas>
        </div>
        <div class="trim-previwe">
          <canvas id="squarePreview"></canvas>
          <canvas id="circlePreview"></canvas>
        </div>
      </div>
      <div class="operation-wrap">
        <custom-button type="primary" :loading="loading">操作</custom-button>
        <custom-button style="margin-left:10px" @click="isVisibled=false">取消</custom-button>
      </div>
    </div>
  </div>
</template>
 
<script>
import customButton from "./customButton";
export default {
  components: {
    customButton,
  },
  props: {
    visibled: {
      type: Boolean,
      default: false,
    },
    // 需要编辑的图片文件
    file: {
      type: [Event, Boolean],
      require: true,
    },
    trimWidth: Number,
    trimHeight: Number,
  },
  computed: {
    isVisibled: {
      set(value) {
        this.$emit("update:visibled", value);
      },
      get() {
        return this.visibled;
      },
    },
  },
  data() {
    return {
      // 确认按钮加载状态
      loading: false,
      // 裁剪canvas的环境
      showImg: false,
      canvasRef: {},
      // 当前图片
      image: false,
      // 裁剪框参数
      trimPosition: {
        startX: 50,
        startY: 50,
        width: 200,
        height: 200,
      },
      // 拖拽点列表
      borderArr: [],
    };
  },
  watch: {
    async file(file) {
      await this.$nextTick();
      this.canvasRef = this.$refs.canvasRef;
      this.showImg = Object.freeze(this.canvasRef.getContext("2d"));
      this.filesInfo(file);
    },
  },
  methods: {
    // 打印选中的图片文件
    filesInfo(rawfile) {
      const file = rawfile.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = (this.image = new Image());
        image.className = "image-class";
        image.src = e.target.result;
        image.onload = () => {
          this.drawImage(image);
        };
      };
      reader.readAsDataURL(file);
    },
    // 预览图片
    drawImage(image) {
      // 清除画布
      this.showImg.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
      // 设置默认canvas元素大小
      const canvasDefaultSize = 300;
      // 初始化canvas画布大小, 获取等比例缩放后的canvas宽高尺寸
      let xiangsubi = 1;
      let proportion = image.width / image.height,
        // 大于1表示宽大,小于1表示高大
        // canvas相除拿到缩放比例
        scale =
          proportion > 1
            ? canvasDefaultSize / image.width
            : canvasDefaultSize / image.height,
        // 宽高都相同缩放
        canvasWidth = image.width * scale * xiangsubi,
        canvasHeight = image.height * scale * xiangsubi;
      console.log(canvasWidth, canvasHeight);
      this.canvasRef.width = canvasWidth;
      this.canvasRef.height = canvasHeight;
      // this.canvasRef.style.width = canvasWidth / xiangsubi + "px";
      // this.canvasRef.style.height = canvasHeight / xiangsubi + "px";
      // 绘制图片，这个image就是我们刚刚获取的Image对象
      this.image = image; // 保存这个Image对象
      this.showImg.drawImage(image, 0, 0);
      this.drawTrim();
    },
    // 绘制裁剪框方法
    drawTrim() {
      const { startX, startY, width, height } = this.trimPosition;
      const ctx = this.showImg;
      const canvasRef = this.canvasRef;
      // ------------------------------- 我的
      ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
      // -------------------- 绘制蒙版
      ctx.fillStyle = "rgba(0,0,0,0.6)"; // 蒙层颜色
      ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);
      ctx.save();
      // -------------------- 裁剪选择框
      ctx.clearRect(startX, startY, width, height);
      // 绘制8个边框像素点并保存坐标信息以及事件参数
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#fc178f";
      let size = 10; // 自定义像素点大小
      const half = size / 2;
      const borderArr = this.borderArr;
      // 上下左右四个角
      borderArr.push({
        x: startX - half,
        y: startY - half,
        size,
        cursor: "nw",
      });
      borderArr.push({
        x: startX + width - half,
        y: startY - half,
        size,
        cursor: "ne",
      });
      borderArr.push({
        x: startX - half,
        y: startY + height - half,
        size,
        cursor: "sw",
      });
      borderArr.push({
        x: startX + width - half,
        y: startY + height - half,
        size,
        cursor: "se",
      });
      borderArr.forEach(({ x, y, size }) => {
        ctx.fillRect(x, y, size, size);
      });
      // -------------------- 图片置底
      ctx.globalCompositeOperation = "destination-over";
      ctx.drawImage(this.image, 0, 0, canvasRef.width, canvasRef.height);
    },
    // ------------------------- 拖拽功能 开始 ------------------------
    moveTrim(mouseX, mouseY) {
      let flag = false;
      const borderArr = this.borderArr;
      const ctx = this.showImg;
      const canvas = this.canvasRef;
      // ------------------------ 拖拽裁剪框
      // console.group("鼠标拖动");

      // console.log(mouseX, mouseY);
      if (borderArr.length) {
        // 判断鼠标位置
        ctx.beginPath();
        borderArr.find(({ x, y, size, cursor }) => {
          ctx.rect(x, y, size, size);
          if (ctx.isPointInPath(mouseX, mouseY)) {
            flag = cursor;
            return true;
          }
        });
      }
      // console.log(flag);
      canvas.style.cursor = flag ? `${flag}-resize` : "Default";
      // console.groupEnd();
      // draggingTrim = !!flag;
      // canvas.style.cursor = flag ? `${flag}-resize` : "Default";
      // if (flag || (draggingTrimDirection && draggingMove === false)) {
      //   console.log(flag || draggingTrimDirection);
      //   // 如果点击裁剪点并移动
      //   if (activeDraggingTrim) {
      //     const { startX, startY, width, height } = draggingTrimStrategy[
      //       flag || draggingTrimDirection
      //     ](mouseX, mouseY);
      //     drawTrim(startX, startY, width, height);
      //     if (flag) draggingTrimDirection = flag;
      //   }
      //   return;
      // }
    },
    // ------------------------- 拖拽功能 结束 ------------------------
    // 鼠标在canvas上移动
    handleMouseMoveCanvas({ offsetX, offsetY }) {
      this.moveTrim(offsetX, offsetY);
    },
  },
};
</script>

<style lang="scss" scoped>
#upload-trim {
  position: fixed;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 10000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.65);
  .dialog-wrap {
    background-color: #fff;
    width: 600px;
    height: 340px;
    margin: auto;
    position: fixed;
    top: -50px;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    .dialog-close {
      position: absolute;
      right: -30px;
      top: -30px;
      transform: rotate(45deg);
      color: #fff;
      transition: all 0.18s ease-in-out;
      cursor: pointer;
      &:hover {
        transform: rotate(135deg);
      }
    }
    .dialog-contant {
      display: flex;
      flex: 1;
      .modal-trim {
        // overflow: hidden;
        position: relative;
        /* 马赛克背景图 */
        background-image: url(https://s10.mogucdn.com/mlcdn/c45406/190723_3afckd96l9h4fh6lcb56117cld176_503x503.jpg);
        background-size: cover;
        margin: 20px;
        width: 300px;
        height: 300px;
        /* 使canvas始终居中 */
        canvas {
          cursor: default;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .trim-previwe {
        display: flex;
        flex-direction: column;
        canvas {
          width: 120px;
          height: 120px;
          background: yellow;
          margin-bottom: 10px;
          &#circlePreview {
            border-radius: 50%;
          }
        }
      }
    }
    .operation-wrap {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>