<template>
  <div id="login">
    <el-row
      class="view-title"
      align="middle"
      justify="center"
      style="font-size: 20px;color: black;margin-bottom: 20px;flex-direction: column;gap: 10px;"
    >
      <img
        width="80"
        alt="AIAPP Logo"
        src="/assets/logo.webp"
      >
      {{ $t('login') }}
    </el-row>
    <el-form
      ref="loginForm"
      :model="data"
      :rules="rules"
      size="large"
      label-position="top"
      status-icon
      require-asterisk-position="right"
    >
      <el-form-item
        label="Email"
        prop="email"
      >
        <el-input
          v-model="data.email"
          type="email"
          placeholder="Email"
        />
      </el-form-item>
      <el-form-item
        label="Password"
        prop="password"
      >
        <el-input
          v-model="data.password"
          type="password"
          placeholder="password"
        />
      </el-form-item>
      <el-form-item
        class="justify-between"
        prop="remember"
      >
        <el-radio
          v-model="data.remember"
          label="Remember"
          value="true"
        />
        <el-link
          href="https://web.aiapp.gg/forgot-password"
          target="_blank"
        >
          Forgot Password?
        </el-link>
      </el-form-item>
      <el-form-item>
        <el-row
          justify="center"
          style="width: 100%;"
        >
          <el-button
            :loading="loading"
            type="primary"
            :icon="User"
            @click="submitForm(loginForm)"
          >
            Login
          </el-button>
        </el-row>
      </el-form-item>
    <!-- <div style="text-align:center;">
      <el-link href="https://web.aiapp.gg/register" target="_blank">Sign Up Now</el-link>
    </div> -->
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { User } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/authStore'

interface Auth {
  email: string
  password: string
  remember: boolean
}

const loginForm = ref<FormInstance>()

const loading = ref<Boolean>(false)

const store = useUserStore()

const data = reactive<Auth>({
  email: '',
  password: '',
  remember: false
})

const rules = reactive<FormRules<Auth>>({
  email: [{ required: true, message: 'Please input email address', trigger: 'blur' }, {
    type: 'email',
    message: 'Please input correct email address',
    trigger: 'blur'
  }],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 8, message: 'Password length should be minimum 8', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  loading.value = true
  await formEl.validate(async (valid) => {
    if (valid) {
      console.log('submit!')
      await store.login(data)
      loading.value = false
    } else {
      loading.value = false
    }
  })
}

// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   formEl.resetFields()
// }
</script>

<style lang="stylus">
.justify-between
  .el-form-item__content
    justify-content space-between

#login
 padding:20px
</style>
