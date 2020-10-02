<template>
  <div id="dashboard" :class="{'on-wallet': otherWallet, 'on-money-transfer': moneyTransfer}">
    <header>
      <p class="name">{{userName}}さんようこそ！</p>
      <button class="signout" @click="signOut">ログアウト</button>
      <p class="wallet">残高：{{userWallet}}</p>
    </header>
    <h1>ユーザー一覧</h1>
    <div id="user-list">
      <table class="table">
        <tr>
          <th>ユーザー名</th>
        </tr>
        <tr v-for="(user,index) in otherUsers" :key=index>
          <td class="other-user-name">{{user.name}}</td>
          <td class="other-user-button"><button @click="getWalletIndex(index)">walletを見る</button><button @click="getTransferIndex(index)">送る</button></td>
        </tr>
      </table>
    </div>
  <transition name="slide">
      <Wallet v-if="otherWallet" :index="index" @close-wallet="switchWalletData"/>
  </transition>
  <transition name="slide">
      <MoneyTransfer v-if="moneyTransfer" :index="index" @close-transfer-money="switchTransferData"/>
  </transition>
  </div>
</template>
<script>
import Wallet from './Wallet';
import MoneyTransfer from './MoneyTransfer';

export default {
  name: 'Dashboard',
  data() {
    return {
      index: 0,
      isWallet: false,
      isMoneyTransfer: false,
    };
  },
  components: { Wallet, MoneyTransfer },
  methods: {
    signOut() {
      this.$store.dispatch('signOut');
    },
    getWalletIndex(index) {
      this.index = index;
      this.switchWalletData();
    },
    switchWalletData() {
      this.isWallet = !this.isWallet;
    },
    getTransferIndex(index) {
      this.index = index;
      this.switchTransferData();
    },
    switchTransferData() {
      this.isMoneyTransfer = !this.isMoneyTransfer;
    }
  },
  computed: {
    userName() {
      return this.$store.state.user.name;
    },
    userWallet() {
      return this.$store.state.user.wallet;
    },
    otherUsers() {
      return this.$store.state.otherUsers;
    },
    otherWallet() {
      return this.isWallet;
    },
    moneyTransfer(){
      return this.isMoneyTransfer;
    }
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
.table {
  width: 80%;
  margin: 0 auto;
}
.other-user-name {
  text-align: center;
}
.other-user-button {
  font-size: 5px;
}
.other-user-button > button {
  margin-top: 0;
  margin-right: 5px;
  color: white;
  background-color: rgb(44, 153, 172);
}
.slide-enter-active {
  animation: slide-in 0.5s;
}
.slide-leave-active {
  animation: slide-out 0.5s;
}
@keyframes slide-in {
  from {
    transform: translateY(-100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100px);
    opacity: 0;
  }
}
.on-wallet::before,
.on-money-transfer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>