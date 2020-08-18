<template>
  <div :class="classList" @click="onClick">
    <div v-if="loading" class="loading">
      <div class="loading1"></div>
      <div class="loading2"></div>
      <div class="loading3"></div>
      <div class="loading4"></div>
      <div class="loading5"></div>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classList() {
      let list = ["bottom-wrap"];
      if (this.type === "primary") list.push("primary");
      if (this.loading) list.push("is-loading");
      return list;
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-wrap {
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  width: 103px;
  height: 40px;
  font-size: 14px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    cursor: pointer;
  }
  .loading {
    display: flex;
    > div {
      width: 2px;
      height: 20px;
      background: #fff;
      margin: 0 2px;
      animation: loading 1s infinite ease-in-out;
    }
    .loading1 {
      animation-delay: -0.9s;
    }
    .loading2 {
      animation-delay: -0.8s;
    }
    .loading3 {
      animation-delay: -0.7s;
    }
    .loading4 {
      animation-delay: -0.6s;
    }
    .loading5 {
      animation-delay: -0.5s;
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
}
.primary {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  &:focus,
  &:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  &:active {
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #fff;
  }
}
.is-loading {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
  cursor: no-drop;
}
</style>>
