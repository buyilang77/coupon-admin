<template>
  <div class="app-container mr-1">
    <el-table :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="用户名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公众号OpenID" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mp_openid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center" width="160">
        <template slot-scope="{row}">
          <span>{{ row.created_at }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchShopUsers } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  name: 'MerchantIndex',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      logistics_companies: [],
      product_list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
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
      fetchShopUsers(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
