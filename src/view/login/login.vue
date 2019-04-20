<style lang="less">
  @import './login.less';
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="login_handle" @on_click_pic="reloadImg" :picUrl="picUrl"></login-form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import LoginForm from '@/components/login-form'
import logins from '@/api/login.js'
import config from '@/config';

export default {
    components: {
        LoginForm,
    },
    data () {
        return {
            picUrl : config.apiConf.baseURL + "/passport/getPicCode",
        }
    },
    methods: {
        login_handle ({ moble, password, code}) {
            logins.post('passport/login',{ moble:moble, 'password':password,code}).then(res => {
                if (res.data.code == 200) {
                    this.$router.push({name:this.$config.homeName});
                } else {
                    this.reloadImg();
                }
            });

        },
        reloadImg () {
            this.picUrl = this.picUrl + '?a=' + Math.random();
        }
    },
    mounted () {
    }
}
</script>

<style>

</style>
