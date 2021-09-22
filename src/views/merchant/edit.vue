<template>
  <div class="createPost-container">
    <div class="createPost-main-container">
      <el-form ref="postForm" :rules="rules" :model="postForm" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="postForm.username" />
        </el-form-item>
        <el-form-item label="商户名称" prop="merchant_name">
          <el-input v-model="postForm.merchant_name" />
        </el-form-item>
        <el-form-item label="姓名" prop="surname">
          <el-input v-model="postForm.surname" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="postForm.phone" />
        </el-form-item>
        <el-form-item label="地区" prop="region">
          <el-cascader
            v-model="postForm.region"
            size="large"
            :options="regionOptions"
            style="width: 100%"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="postForm.address" />
        </el-form-item>
        <el-form-item label="账号状态">
          <el-switch v-model="postForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-divider />
        <div class="text-center">
          <el-button v-loading="loading" style="margin-left: 10px;" @click="submitForm">提交</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { fetchMerchant, updateMerchant } from '@/api/merchant'
import { regionData } from 'element-china-area-data'

const defaultForm = {
  id: undefined,
  merchant_name: null,
  surname: null,
  phone: null,
  status: 0
}

export default {
  name: 'MerchantEdit',
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        username: [{ required: true, message: '用户名不可为空!', trigger: 'blur' }],
        phone: [{ required: true, message: '手机号不可为空!', trigger: 'blur' }],
        status: [{ required: true, message: '状态不可为空!', trigger: 'blur' }]
      },
      regionOptions: regionData
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.getMerchant(id)
  },
  methods: {
    getMerchant(id) {
      fetchMerchant(id).then(response => {
        this.postForm = response.data
      })
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          updateMerchant(this.postForm.id, this.postForm).then(response => {
            this.loading = true
            this.$notify({
              title: '成功',
              message: response.message,
              type: 'success',
              duration: 2000
            })
            this.loading = false
            this.$router.push('/merchant/index')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .createPost-container {
    position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;
    }
  }
</style>
