<template>
  <div>
    <div class="form-group" >
      <router-link :to="{name: 'createBook'}" class="btn btn-success">Create new book</router-link>
    </div>
    <div class="panel panel-default">
      <div class="card-header text-center">
        <h3>Books list</h3>
      </div>
      <div class="panel-body">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th width="200">Image</th>
              <th>Book name</th>
              <th>Author</th>
              <th>Description</th>
              <th>Publishing company</th>
              <th width="100">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, index) in pageOfItems" :key="index">
              <td>{{ book.id }}</td>
              <td>{{ book.name }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.description }}</td>
              <td>{{ book.publishing }}</td>
              <td>
                <router-link
                  :to="{name: 'updateBook', params: {id: book.id}}"
                  class="btn btn-xs btn-info"
                >Edit</router-link>
                <a href="#" class="btn btn-xs btn-danger" v-on:click="deleteBook(book.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer pb-0 pt-3">
        <jw-pagination :items="books.items" :pageSize="5" :maxPages="5" @changePage="onChangePage"></jw-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      pageOfItems: []
    };
  },
  computed: {
    ...mapState({
      account: state => state.account,
      books: state => state.books.all
    })
  },
  created() {
    this.getAllBooks();
  },
  methods: {
    ...mapActions("books", {
      getAllBooks: "getAll",
      deleteBook: "delete"
    }),
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    }
  }
};
</script>
<style>
</style>