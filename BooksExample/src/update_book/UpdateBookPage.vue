<template>
  <div class="col-sm-6 offset-sm-3">
    <h2>Update Book</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Book Name</label>
        <input
          type="text"
          v-model="book.name"
          v-validate="'required'"
          name="name"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('name') }"
        />
        <div
          v-if="submitted && errors.has('name')"
          class="invalid-feedback"
        >{{ errors.first('name') }}</div>
      </div>
      <div class="form-group">
        <label for="author">Author</label>
        <input
          type="text"
          v-model="book.author"
          v-validate="'required'"
          name="author"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('author') }"
        />
        <div
          v-if="submitted && errors.has('author')"
          class="invalid-feedback"
        >{{ errors.first('author') }}</div>
      </div>
      <div class="form-group">
        <label for="description">Desciption</label>
        <input
          type="text"
          v-model="book.description"
          v-validate="'required'"
          name="description"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('description') }"
        />
        <div
          v-if="submitted && errors.has('description')"
          class="invalid-feedback"
        >{{ errors.first('description') }}</div>
      </div>
      <div class="form-group">
        <label for="publishing">Publishing Company</label>
        <input
          type="text"
          v-model="book.publishing"
          v-validate="'required'"
          name="publishing"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('publishing') }"
        />
        <div
          v-if="submitted && errors.has('publishing')"
          class="invalid-feedback"
        >{{ errors.first('publishing') }}</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Update</button>
        <!-- <img
          v-show="all.updating"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />-->
        <router-link to="/" class="btn btn-link">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      bookID: null,
      book: {
        name: "",
        author: "",
        description: "",
        publishing: ""
      },
      submitted: false
    };
  },
  computed: {
    ...mapState("books", ["all"])
  },
  methods: {
    ...mapActions("books", {
      getById: "getById",
      updateBook: "update"
    }),

    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.updateBook(this.book, this.bookID);
        }
      });
    }
  },
  created() {
      
  }
};
</script>
