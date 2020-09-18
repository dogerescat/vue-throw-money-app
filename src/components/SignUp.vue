<template>
  <div id="sign-up">
    <h1>新規登録画面</h1>
    <table>
        <tr>
            <td>ユーザー名</td>
            <td><input type="text" placeholder="username" v-model="username" /></td>
        </tr>
        <tr>
            <td>メールアドレス</td>
            <td><input type="text" placeholder="email" v-model="email" /> </td>
        </tr>
        <tr>
            <td>パスワード</td>
            <td><input type="password" placeholder="password" v-model="password" /></td>
        </tr>
    </table>
    <button type="button" value="新規登録" @click="signUp" >新規登録</button>
  </div>
</template>
<script>
import firebase from 'firebase'

export default {
  name: 'SignUp',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
      signUp(){
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .catch(error => {
              alert(error.message)
          })
      }
  }
};
</script>
<style>
button {
    color: rgb(44, 153, 172);
    background-color: white;
    margin-top: 30px;
    padding: 10px;
    border: solid 1px rgb(44, 153, 172);
    border-radius: 10%;
    font-size: 1.2em;
}
</style>
