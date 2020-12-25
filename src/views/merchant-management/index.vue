<template>
  <div class="app-container mr-1">
    <div class="filter-container">
      <el-input v-model="listQuery.merchant_name" placeholder="请输入关键字" style="width: 200px;" class="filter-item mr-1" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="商户名称" align="center">
        <template slot-scope="{row}">
          <span :title="row.merchant_name">{{ row.merchant_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center" width="95">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.surname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" width="110">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="{row}">
          <span>{{ formatRegion(row.region) }} {{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号状态" align="center" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusType">
            {{ row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="redirectToEdit(row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList, updateOrder } from '@/api/merchant'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  name: 'MerchantIndex',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '未审核',
        1: '已审核'
      }
      return statusMap[status]
    },
    statusType(status) {
      const statusMap = {
        0: 'info',
        1: 'success'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      logistics_companies: [],
      product_list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        merchant_name: undefined
      },
      regionOptions: regionData,
      multipleSelection: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    handleUpdate(row) {
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateOrder(tempData.id, tempData).then(response => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: response.message,
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    formatRegion(region) {
      const item = region.map((item) => {
        return CodeToText[item]
      })
      return item.join('')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    redirectToEdit(id) {
      this.$router.push({ name: 'MerchantEdit', params: { id: id }})
    }
  }
}
</script>
