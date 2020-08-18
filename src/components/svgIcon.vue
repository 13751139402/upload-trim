<template>
  <svg class="icon" aria-hidden="true"  style="font-size:25px;pointer-events: none;">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
      require: true,
    },
  },
};
</script>

<style>
</style>