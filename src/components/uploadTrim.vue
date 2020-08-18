<template>
  <div id="upload-trim" v-if="isVisibled">
    <div class="dialog-wrap">
      <div class="dialog-close" @click="isVisibled=false">
        <svg-icon icon="21"></svg-icon>
      </div>
      <div class="dialog-contant">
        <div class="modal-trim">
          <canvas id="trim" ref="trim" width="400" height="260" @mousemove="handleMouseMoveCanvas"></canvas>
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
      // 裁剪canvas的元素
      trimCanvas: false,
      // 裁剪canvas的环境
      trimCtx: false,
      // 当前图片
      currentImage: false,
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
      this.trimCanvas = this.$refs.trim;
      this.trimCtx = Object.freeze(this.trimCanvas.getContext("2d"));
      this.drawImage(file);
    },
  },
  methods: {
    // 图片打印至canvas
    drawImage(rawfile) {
      const file = rawfile.target.files[0];
      const reader = new FileReader();
      const _this = this;
      reader.onload = (e) => {
        const image = (this.currentImage = new Image());
        image.className = "image-class";
        image.src = e.target.result;
        image.onload = () => {
          const canvas = _this.trimCanvas;
          // 1.canvas.style.width  canvas的盒子模型宽高
          // 2.canvas.width        canvas的画布宽高
          // 画布的style.width会拉伸缩放canvas
          const { width: canvasWidth, height: canvasHeight } = _this.trimCanvas;
          let { width: imageWidth, height: imageHeight } = image;
          // 获取宽高比例，因为canvas height 比较短，所以需要把进行缩放
          const heightRatio = canvasHeight / imageHeight;
          const widthRatio = canvasWidth / imageWidth;
          const canvasRatio = canvasHeight / canvasWidth;
          const imageRatio = imageHeight / imageWidth;
          let ratio = 1;
          // 如果图片宽高比 比 canvas大 则需要进行缩小
          if (imageRatio > canvasRatio) {
            ratio = canvasRatio / imageRatio;
          }
          // -- 图片同比例打印
          canvas.width = imageWidth;
          canvas.height = imageHeight;
          // -- 控制style.height进行拉伸
          if (imageWidth > imageHeight) {
            canvas.style.height = imageHeight * widthRatio * ratio + "px";
          } else {
            canvas.style.width = imageWidth * heightRatio * ratio + "px";
          }
          // 等比例缩放
          _this.trimCtx.drawImage(image, 0, 0);
        };
      };
      reader.readAsDataURL(file);
    },
    // 绘制裁剪框方法
    drawTrim() {
      const { startX, startY, width, height } = this.trimPosition;
      const ctx = this.trimCtx;
      const canvas = this.trimCanvas;
      // ------------------------------- 我的
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // -------------------- 绘制蒙版
      ctx.fillStyle = "rgba(0,0,0,0.6)"; // 蒙层颜色
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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
        console.log("打印的8个电:", x, y, size, size);
        ctx.fillRect(x, y, size, size);
      });
      // -------------------- 图片置底
      ctx.globalCompositeOperation = "destination-over";
      ctx.drawImage(this.currentImage, 0, 0, canvas.width, canvas.height);
    },
    // ------------------------- 拖拽功能 开始 ------------------------
    moveTrim(mouseX, mouseY) {
      let flag = false;
      const borderArr = this.borderArr;
      const ctx = this.trimCtx;
      const canvas = this.trimCanvas;
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
        width: 400px;
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