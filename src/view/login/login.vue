<style lang="less">
  @import './login.less';
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="login_handle"></login-form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import LoginForm from '@/components/login-form'
export default {
    components: {
        LoginForm
    },
    methods: {
        login_handle ({ moble, password }) {
            this.$http.post('/passport/login',{ moble, 'login_pwd':password }).then(res => {
                
            }).catch(function(err) {})
        }
    }
}
</script>

<style>

</style>
