<template>
  <div id="wallet">
    <div>{{ userName }}さんの残高</div>
    <p>{{ userBalance }}</p>
    <div class="close-wallet">
    <button @click="closeWallet">close</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Wallet',
  props: {
    index: {
      type: Number,
    },
  },
  methods: {
    closeWallet() {
      this.$emit('close-wallet');
    }
  },
  computed: {
    userName() {
      return this.$store.state.otherUsers[this.index].name;
    },
    userBalance() {
      return this.$store.state.otherUsers[this.index].wallet;
    },
  },
};
</script>
<style scoped>
  #wallet {
    position: absolute;
    width: 40%;
    background-color: white;
    margin-top: 10px;
    margin-left: 25%;    
    margin-bottom: 5px;
    z-index: 1;
  }
  .close-wallet {
    background-color: rgb(187, 185, 185);
  }
  .close-wallet > button {
    background-color: rgb(226, 63, 63);
    color: white;
    margin-left: 50%;
  }
</style>