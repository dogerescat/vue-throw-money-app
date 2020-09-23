<template>
  <div id="dashboard">
    <header>
      <p class="name">{{userName}}さんようこそ！</p>
      <p class="wallet">残高：{{userWallet}}</p>
    </header>
    <h1>ユーザー一覧</h1>
  </div>
</template>
<script>
export default {
  name: 'Dashboard',
  computed: {
    userName() {
      return this.$store.state.user.name;
    },
    userWallet() {
      return this.$store.state.user.wallet;
    },
  },
};
</script>
<style scoped>
header {
  height: 100px;
}
.name {
  float: left;
  margin-left: 20px;
}
.wallet {
  float: right;
  margin-right: 20px;
}
</style>