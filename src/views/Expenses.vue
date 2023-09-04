<template>
  <h1>Expense List</h1>
  <div class="table-content">
    <h3 id="main">User : {{ username }}</h3>
    <h3>Filter Content</h3>
    <div>
      <label> Price : </label>
      <input type="number" v-model="startprice" class="start-price" placeholder="start price" />
      <span>&nbsp;to&nbsp;</span>
      <input type="number" v-model="endprice" class="end-price" placeholder="end price" />
      <span>&nbsp;&nbsp;</span>
      <button class="price-filter" name="price" @click="filterSubmit">apply</button>
    </div>
    <div>
      <label> Date : </label>
      <input type="date" v-model="startdate" class="start-date" />
      <span>&nbsp;to&nbsp;</span>
      <input type="date" v-model="enddate" class="end-date" />
      <span>&nbsp;&nbsp;</span>
      <button class="date-filter" name="date" @click="filterSubmit" >apply</button>
    </div>
    <el-table :data="getTableData()" border style="width: 100%">
      <el-table-column :formatter="format" label="No" width="50" />
      <el-table-column prop="title" label="Title" />
      <el-table-column prop="amount" sortable label="Amount" />
      <el-table-column prop="status" sortable label="In/Out" />
      <el-table-column prop="description" label="Description" />
      <el-table-column prop="date" sortable label="Date" />
    </el-table>
    <div class="pagination-block">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 5]"
          layout="sizes, prev, pager, next" :total="total"
      />
    </div>
  </div>
</template>

<script>
import {withBasename} from "@/utils/params";

export default {
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      username: localStorage.username,
      startprice: null,
      endprice: null,
      startdate: '',
      enddate: '',
      rawData: [],
    }
  },
  mounted() {
    fetch(withBasename("getList"), {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "token": localStorage.token,
      },
    }).then(response => {
      if(response.ok){
        response.json().then(data => this.showTableData(data))
      }
      else{
        response.json().then(error => {
          console.log(error)
        })
      }
    })
  },
  methods: {
    getTableData() {
      const { rawData, currentPage, pageSize } = this
      return rawData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    },
    format(row, column, cellValue, index) {
      return index + 1
    },
    showTableData(data) {
      this.total = data.expenses.length
      this.rawData = data.expenses.map((item, index) => ({
        id: index,
        title: item.title,
        amount: '$' + item.amount,
        status: item.status === 1 ? 'Out' : 'In',
        description: item.description,
        date: item.createdAt.substring(0, 10),
      }))
    },
    filterSubmit(e) {
      const data = new FormData();
      data.append('flag', e.target.name);
      data.append('startprice', this.startprice);
      data.append('endprice', this.endprice);
      data.append('startdate', this.startdate);
      data.append('enddate', this.enddate);
      fetch(withBasename("getFilerList"), {
        method: 'POST',
        body: data,
        credentials: 'same-origin'
      }).then(response => {
        if(response.ok){
          response.json().then(data => this.showTableData(data))
        }
        else{
          response.json().then(error => {
            console.log(error)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}
.table-content {
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 30px;
}
</style>