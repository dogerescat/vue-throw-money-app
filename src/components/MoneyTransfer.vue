<template>
  <div id="money-transfer">
    <p>あなたの残高：{{ userWallet }}</p>
    <p>送る金額</p>
    <div class="send-money">
      <input type="number" v-model.number="transferMoney" />
      <button class="transfer-button" @click="sendMoney">送信</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MoneyTransfer',
  data() {
    return {
      transferMoney: 0,
      transferredUserMoney: 0,
      transferredOtherUserMoney: 0,
      userUid: '',
      otherUserUid: '',
    };
  },
  props: {
    index: {
      type: Number,
    },
  },
  methods: {
    sendMoney() {
      if (this.transferMoney < 1) {
        alert('正しい金額を入力してください');
        return;
      } else if (this.transferMoney > this.userWallet) {
        alert('所持金が足りません');
        return;
      }
      this.calculateMoney();
      this.setUid();
      this.$store.dispatch('updateOtherUserWallet', {
        money: this.transferredOtherUserMoney,
        index: this.index,
        uid: this.otherUserUid,
      });
      this.$store.dispatch('updateUserWallet', {
        money: this.transferredUserMoney,
        uid: this.userUid,
      });
      this.closeTransferMoney();
    },
    closeTransferMoney() {
      this.$emit('close-transfer-money');
    },
    calculateOtherUserMoney() {
      this.transferredOtherUserMoney = this.otherUserWallet;
      this.transferredOtherUserMoney += this.transferMoney;
    },
    calculateUserMoney() {
      this.transferredUserMoney = this.userWallet;
      this.transferredUserMoney -= this.transferMoney;
    },
    calculateMoney() {
      this.calculateUserMoney();
      this.calculateOtherUserMoney();
    },
    setOtherUserUid() {
      this.otherUserUid = this.getOtherUserUid;
    },
    setUserUid() {
      this.userUid = this.getUserUid;
    },
    setUid() {
      this.setUserUid();
      this.setOtherUserUid();
    }
  },
  computed: {
    userWallet() {
      return this.$store.state.user.wallet;
    },
    otherUserWallet() {
      return this.$store.state.otherUsers[this.index].wallet;
    },
    getOtherUserUid() {
      return this.$store.state.otherUsers[this.index].uid;
    },
    getUserUid() {
      return this.$store.state.user.uid;
    },
  },
};
</script>
<style scoped>
#money-transfer {
  position: absolute;
  width: 40%;
  background-color: white;
  margin-top: 10px;
  margin-left: 25%;
  margin-bottom: 5px;
  z-index: 1;
}
.send-money {
  background-color: rgb(187, 185, 185);
  height: 75px;
}
.transfer-button {
  background-color: rgb(226, 63, 63);
  color: white;
  margin-left: 50%;
  margin-top: 5px;
  padding: 5px;
  font-size: 0.9em;
}
</style>