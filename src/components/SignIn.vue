<template>
    <div id="sign-in">
        <h1>ログイン画面</h1>
        <table>
            <tr>
                <td>メールアドレス</td>
                <td><input type="email" v-model="email" placeholder="email"></td>
            </tr>
            <tr>
                <td>パスワード</td>
                <td><input type="password" v-model="password" placeholder="password"></td>
            </tr>
        </table>
    <button value="ログイン" @click="signIn">ログイン</button>
    <router-link to="/" class="router" >新規登録はこちらから</router-link>
    </div>
</template>
<script>
export default {
    name: 'SignIn',
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signIn(){
            if (this.email === '' || this.password === '') {
                alert('全て入力してください')
            } else {
                this.$store.dispatch('signIn', { email: this.email, password: this.password})
                this.email = ''
                this.password = ''
            }
        }
    }
}
</script>
