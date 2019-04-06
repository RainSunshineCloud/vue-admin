<template>
    <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
        <FormItem prop="moble">
            <Input v-model="form.moble" placeholder="手机号">
                <span slot="prepend">
                    <Icon :size="16" type="ios-person"></Icon>
                </span>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                    <Icon :size="14" type="md-lock"></Icon>
                </span>
            </Input>
        </FormItem>
        <Row>
            <Col span="15">
                <FormItem prop="pic_code">
                    <Input type="text" v-model="form.pic_code" placeholder="请输入验证码"/>
                </FormItem>
            </Col>
            <Col span="8" offset="1" text-align="center">
               <span><img :src="picUrl" alt="图片验证码" style="line-height:32px;height:32px;" @click="reloadImg"></span>
            </Col>
        </Row>
        <FormItem>
            <Button @click="handleSubmit" type="primary" long>登录</Button>
        </FormItem>
    </Form>
</template>
<script>
export default {
    name: 'LoginForm',
    props: {
        mobleRules: {
            type: Array,
            default: () => {
                return [
                    { required: true, message: '手机号不能为空', trigger: 'blur' }
                ]
            }
        },
        passwordRules: {
            type: Array,
            default: () => {
                return [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        },
        picUrl: {
            type:String,
        }
    },
    data () {
        return {
            form: {
                moble: '',
                password: ''
            },
        }
    },
    computed: {
        rules () {
            return {
                moble: this.userNameRules,
                password: this.passwordRules
            }
        },
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.$emit('on-success-valid', {
                        moble: this.form.moble,
                        password: this.form.password,
                        code: this.form.pic_code,
                    })
                }
            })
        },
        reloadImg () {
            this.$emit('on_click_pic');
        }
    }
}
</script>
