<template>
  <div>
    <v-container>
      <v-row v-if="items && items.length > 0">
        <v-col v-for="item in items" :key="item.ProductsId" cols="12" sm="6" md="4" lg="3">
          <v-card>
            <!-- Display your product details here -->
            <v-img :src="'https://localhost:7072' + item.ImagerUrl" height="200" @error="handleImageError(item)"></v-img>
            <v-card-title>{{ item.ProductsName }}</v-card-title>
            <v-card-subtitle>{{ item.Price }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" class="text-center">
          <p>No items to display.</p>
        </v-col>
      </v-row>
      <v-row v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
      errors: [],
      loading: false,
    };
  },
  created() {
    this.loading = true;
    axios.get('https://localhost:7072/api/Products/GetProducts')
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          this.items = response.data.map(item => {
            console.log('Image URL:', item.ImagerUrl); // Log image URL for debugging
            return item;
          });
        } else {
          console.error('Invalid or unexpected API response format:', response.data);
        }
        this.loading = false;
      })
      .catch(error => {
        this.errors.push(error);
        this.loading = false;
      });
  },
  methods: {
    handleImageError(item) {
      if (item && typeof item === 'object') {
        console.error('Error loading image for item:', item);

        // Check if ImagerUrl is a valid string
        if (item.ImagerUrl && typeof item.ImagerUrl === 'string' && item.ImagerUrl.trim() !== '') {
          console.log('Valid Image URL:', item.ImagerUrl);
        } else {
          console.warn('Invalid or empty image URL for item:', item);
          // Set a default image URL or handle the error in another way
          item.ImagerUrl = '/74c09b67-aef9-4543-b180-6d721a31ddb6.jpg';
        }
      }
      else {
        console.warn('Invalid item object:', item);
      }
    },
  },
};
</script>

<style>
/* Add your custom styles here */
</style>
