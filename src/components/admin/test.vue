<template>
  <v-form @submit.prevent="addProduct">
    <!-- Product Name -->
    <v-text-field v-model="newProduct.ProductsName" label="Product Name"></v-text-field>

    <!-- Quantity -->
    <v-text-field v-model="newProduct.Quatity" label="Quantity"></v-text-field>

    <!-- Price -->
    <v-text-field v-model="newProduct.Price" label="Price"></v-text-field>

    <!-- Description -->
    <v-text-field v-model="newProduct.ProductsDescription" label="Description"></v-text-field>

    <!-- Category -->
    <v-autocomplete
      :items="categoryOptions"
      label="Category"
      item-text="text"
      item-value="value"
      v-model="newProduct.CategoryId"
    >
    </v-autocomplete>

    <!-- Image Upload -->
    <v-file-input v-model="newProductImage" label="Image" accept="image/*"></v-file-input>

    <!-- Additional fields for adding (promotion, origin, warranty) -->
    <v-text-field v-model="newProduct.promotion" label="Promotion"></v-text-field>
    <v-text-field v-model="newProduct.origin" label="Origin"></v-text-field>
    <v-text-field v-model="newProduct.warranty" label="Warranty"></v-text-field>

    <!-- Submit button -->
    <v-btn type="submit" color="primary">Add Product</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newProduct: {
        ProductsName: '',
        Quatity: '',
        Price: '',
        ProductsDescription: '',
        CategoryId: null, // Initialize CategoryId as null
        promotion: '',
        origin: '',
        warranty: '',
      },
      newProductImage: null,
      categoryOptions: [],
    };
  },
  methods: {
    fetchCategories() {
  axios.get('https://localhost:7072/api/Categorys/Categorys')
    .then(response => {
      if (Array.isArray(response.data)) {
        this.categoryOptions = response.data.map(category => ({
          text: category.CategoryName,
          value: category.CategoryId,
        }));
      } else {
        console.error('Invalid data format received from the API.');
      }
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
},
    addProduct() {
      const formData = new FormData();
      formData.append('file', this.newProductImage);
      formData.append('ProductsName', this.newProduct.ProductsName);
      formData.append('Quatity', this.newProduct.Quatity);
      formData.append('Price', this.newProduct.Price);
      formData.append('ProductsDescription', this.newProduct.ProductsDescription);
      formData.append('CategoryId', this.newProduct.CategoryId);
      formData.append('promotion', this.newProduct.promotion);
      formData.append('origin', this.newProduct.origin);
      formData.append('warranty', this.newProduct.warranty);

      axios.post('https://localhost:7072/api/Products/AddProductWithImage', formData)
        .then(response => {
          console.log('Product added successfully:', response.data);
          // You can perform additional actions after adding the product
        })
        .catch(error => {
          console.error('Error adding product:', error);
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
          }
        });
    },
  },
  mounted() {
    // Fetch categories when the component is mounted
    this.fetchCategories();
  },
};
</script>
