<template>
  <div class="error-store">
    <Badge dot :count="countComputed">
      <Button type="text" @click="openErrorLoggerPage">
        <Icon :size="20" type="ios-bug"/>
      </Button>
    </Badge>
  </div>
</template>

<script>
export default {
  name: 'ErrorStore',
  props: {
    count: {
      type: Number,
      default: 0
    },
    hasRead: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    countComputed () {
      return this.hasRead ? 0 : this.count
    }
  },
  methods: {
    openErrorLoggerPage () {
      this.$router.push({
        name: 'error_logger_page'
      })
    }
  }
}
</script>

<style lang="less">
</style>
