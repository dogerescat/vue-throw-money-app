<template>
  <div id="dashboard">
    <header>
      <p class="name">{{userName}}さんようこそ！</p>
      <button class="signout" @click="signOut">ログアウト</button>
      <p class="wallet">残高：{{userWallet}}</p>
    </header>
    <h1>ユーザー一覧</h1>
  </div>
</template>
<script>
export default {
  name: 'Dashboard',
  methods: {
    signOut(){
      this.$store.dispatch('signOut');
    }
  },
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
  margin-left: 16px;
}
.wallet {
  float: right;
  margin-right: 16px;
}
.signout {
  float: right;
  margin: 16px;
  padding: 5px;
  font-size: 0.8em;
}
</style>