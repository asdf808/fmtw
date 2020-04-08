<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <nuxt-link to="/login">
            <el-button type="primary" size="small" style="background: #2bb8aa">登录</el-button>
          </nuxt-link>
        </span>
      </header>
    </article>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
          <el-button size="small" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">同意以下协议并注册</el-button>
          <div ref="errMsg" class="error" />
        </el-form-item>
        <el-form-item>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout: 'blank',
  data () {
    return {
      ruleForm: {
        name: '',
        email: '',
        code: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        pass: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        checkPass: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              console.log(callback)
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次密码不一致'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      statusMsg: ''
    }
  },
  methods: {
    sendMsg () {
      let namePass
      let emailPass
      if (this.timerid) {
        return false
      }
      this.$refs.ruleForm.validateField('name', (valid) => {
        namePass = valid
      })
      this.statusMsg = ''
      if (namePass) {
        return false
      }
      this.$refs.ruleForm.validateField('email', (valid) => {
        emailPass = valid
      })
      const _this = this
      if (!namePass && !emailPass) {
        this.$axios.post('/user/verify', {
          username: encodeURIComponent(_this.ruleForm.name),
          email: _this.ruleForm.email
        }).then(({ status, data }) => {
          if (status === 200 && data && data.code === 0) {
            let count = 600
            _this.statusMsg = `验证码已发送,剩余${count--}秒`
            _this.timerid = setInterval(() => {
              _this.statusMsg = `验证码已发送,剩余${count--}秒`
              _this.statusMsg = data.msg
              if (count === 0) {
                clearInterval(_this.timerid)
              }
            }, 1000)
          }
        })
      }
    },
    register () {
      const _this = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          _this.$axios.post('/user/signup', {
            username: encodeURIComponent(_this.ruleForm.name),
            password: CryptoJS.MD5(_this.ruleForm.password).toString(),
            email: _this.ruleForm.email,
            code: _this.ruleForm.code
          }).then((status, data) => {
            if (status === 200) {
              if (data && data.code === 0) {
                location.href = '/login'
              } else {
                _this.$refs.errMsg.textContent = data.msg
              }
            } else {
              _this.$refs.errMsg.textContent = `服务器出错:${status}`
            }
          })
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import "@/assets/css/register/index.scss";
</style>
