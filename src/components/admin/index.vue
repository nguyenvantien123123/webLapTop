<template>
    <v-app>
        <v-main>
            <v-app-bar :elevation="2" color="blue">
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn>Hire me</v-btn>
                    <v-btn>Blog</v-btn>
                    <v-btn>
                        <v-icon>mdi-cat</v-icon>
                    </v-btn>
                    <v-btn>
                        <v-badge content="5" color="red">
                            <v-icon>mdi-bell</v-icon>
                        </v-badge>
                    </v-btn>
                    <v-btn>
                        <v-avatar>
                            <v-img src="" alt=""></v-img>
                        </v-avatar>
                    </v-btn>
                </v-toolbar-items>
            </v-app-bar>

            <v-navigation-drawer>
                <v-toolbar color="primary">
                    <v-icon class="ml-2">mdi-home</v-icon>
                    <v-toolbar-title class="mx-2">QUẢN TRỊ SHOP</v-toolbar-title>
                </v-toolbar>
                <v-list density="compact">
                    <v-list-subheader>Danh mục </v-list-subheader>
                    <v-list-item v-for="(item, i) in links" :key="i" :value="item" color="blue"
                        style="text-align: justify;">
                        <template v-slot:prepend>
                            <v-icon :icon="item.icon"></v-icon>
                        </template>

                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-row class="mt-2">
                <v-icon>mdi-home</v-icon>
                <h3 class="ml-2">Danh sách loại sản phẩm</h3>
                <v-spacer></v-spacer>
                <v-btn icon size="small" color="blue" @click="dialogAdd = true">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-dialog v-model="dialogAdd" max-width="600">
                    <v-card>
                        <v-card-title class="headline">Add New Product</v-card-title>
                        <v-card-text>
                            <!-- Form for adding a new product -->
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
                                <!-- Category -->
                                
                                <v-autocomplete v-model="newProduct.CategoryId" :items="categoryOptions" label="Category"
                                items="CategoryId" item-value="CategoryName"></v-autocomplete>



                                <!-- Image Upload -->
                                <v-file-input v-model="newProductImage" label="Image" accept="image/*"></v-file-input>

                                <v-text-field v-model="newProduct.promotion" label="promotion "></v-text-field>
                                <v-text-field v-model="newProduct.origin" label="origin "></v-text-field>
                                <v-text-field v-model="newProduct.warranty" label="warranty "></v-text-field>

                                <!-- Submit button -->
                                <v-btn type="submit" color="primary">Add Product</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogEdit" max-width="600">
                    <v-card>
                        <v-card-title class="headline">Edit Product</v-card-title>
                        <v-card-text>
                            <!-- Form for editing an existing product -->
                            <v-form @submit.prevent="editProduct">
                                <!-- Product Name -->
                                <v-text-field v-model="editedProduct.ProductsName" label="Product Name"></v-text-field>

                                <!-- Quantity -->
                                <v-text-field v-model="editedProduct.Quatity" label="Quantity"></v-text-field>

                                <!-- Price -->
                                <v-text-field v-model="editedProduct.Price" label="Price"></v-text-field>

                                <!-- Description -->
                                <v-text-field v-model="editedProduct.ProductsDescription"
                                    label="Description"></v-text-field>

                                <!-- Category -->
                                <v-autocomplete v-model="editedProduct.CategoryId" :items="categoryOptions"
                                    label="Category"></v-autocomplete>

                                <!-- Additional fields for editing (promotion, origin, warranty) -->
                                <v-text-field v-model="editedProduct.promotion" label="Promotion"></v-text-field>
                                <v-text-field v-model="editedProduct.origin" label="Origin"></v-text-field>
                                <v-text-field v-model="editedProduct.warranty" label="Warranty"></v-text-field>

                                <!-- Submit button -->
                                <v-btn type="submit" color="primary">Save Changes</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lương</th>
                                    <th>Giá</th>
                                    <th>Mô tả</th>
                                    <th>Danh mục</th>
                                    <th>Ảnh sản phẩm</th>
                                    <th>Khuyến mại</th>
                                    <th>Nguồn gốc</th>
                                    <th>Bảo hành</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in products" :key="index" style="text-align: left;">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.ProductsName }}</td>
                                    <td>{{ item.Quatity }}</td>
                                    <td>{{ item.Price }}</td>
                                    <td>{{ item.ProductsDescription }}</td>
                                    <td>{{ item.CategoryName }}</td>
                                    <!-- Thêm thành phần v-img để hiển thị ảnh -->
                                    <td>
                                        <v-img :src="'https://localhost:7072' + item.ImagerUrl"
                                            alt="Hình ảnh sản phẩm"></v-img>
                                    </td>
                                    <td>{{ item.promotion }}</td>
                                    <td>{{ item.origin }}</td>
                                    <td>{{ item.warranty }}</td>
                                    <td>
                                        <v-btn color="blue" class="mr-3" size="x-small" icon="" @click="dialogEdit = true,
                                            currentItem = item">
                                            <v-icon>mdi-pencil</v-icon>

                                        </v-btn>
                                        <v-btn color="blue" class="mr-3" size="x-small" icon @click="dialogDelete = true,
                                            ProductsId = item.ProductsId">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </td>

                                </tr>
                            </tbody>
                        </v-table>
                    </v-card>
                </v-col>
            </v-row>
            <add-view :dialogAdd="dialogAdd" @close="dialogAdd = false" @updateData="getCategories" />
            <edit-view :currentItem="currentItem" :dialogEdit="dialogEdit" @close="dialogEdit = false"
                @updateData="getCategories" @loadData="getProducts" />
            <v-dialog maxWidth="450px" v-model="dialogDelete">
                <v-card>
                    <v-alert type="error">
                        <v-row align="center">
                            <v-col cols="11" class="text-center">
                                Bạn có chắc chắn không ?
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-spacer></v-spacer>
                            <v-col cols="5">
                                <v-btn variant="text" @click="deleteProduct(ProductsId)">Đồng ý</v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn variant="text" @click="dialogDelete = false">Hủy bỏ</v-btn>
                            </v-col>
                        </v-row>
                    </v-alert>
                </v-card>
            </v-dialog>
        </v-main>
    </v-app>
</template>
  
<script>
import axios from 'axios';

export default {

    name: 'admin',
    data() {
        return {
            dialogDelete: false,
            dialogAdd: false,
            newProduct: {
                ProductsName: '',
                Quatity: '',
                Price: '',
                ProductsDescription: '',
                CategoryId: '',
                promotion: '',
                origin: '',
                warranty: '',
            },
            editedProduct: {
                ProductsName: '',
                Quatity: '',
                Price: '',
                ProductsDescription: '',
                CategoryId: '',
                promotion: '',
                origin: '',
                warranty: '',
            },
            newProductImage: null,
            categoryOptions: [],
            dialogEdit: false,
            links: [
                { icon: 'mdi-flask', text: 'Đơn hàng' },
                { icon: 'mdi-calendar', text: 'Chi tiết đơn hàng' },
                { icon: 'mdi mdi-cash-multiple', text: 'Doanh thu' },
                { icon: 'mdi-account-key', text: 'Quản lý tài khoản' },
                { icon: 'mdi mdi-logout', text: 'Đăng xuất' },

            ],
            products: [],
            ProductsId: '',
            ProductsName: '',
            Quatity: '',
            Price: '',
            ProductsDescription: '',
            CategoryId: '',
            ImagerUrl: '',
            promotion: '',
            origin: '',
            warranty: '',
            CategoryId: null,
            currentItem: null,
        };
    },
    methods: {
        getProducts() {
            axios.get('https://localhost:7072/api/Products/GetProducts')
                .then(response => {
                    this.products = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        getCategories() {
            axios.get(`https://localhost:7072/api/Categorys/Categorys?newCategorysName=${this.CategoryId}`)
                .then(response => {
                    this.categoryOptions = response.data.map(category => ({
                        text: category.CategoryId,
                        value: category.CategoryId,
                    }));
                    this.dialogAdd = true; // Open the dialog after fetching categories
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
        },

        deleteProduct() {
            console.log('Deleting product with ID:', this.ProductsId);
            axios.delete(`https://localhost:7072/api/Products/DeleteProducts/?NewProductsId=${this.ProductsId}`)
                .then(response => {
                    var newArr = this.products.filter(x => x.ProductsId != this.ProductsId);
                    this.products = newArr;
                    this.dialogDelete = false;
                    console.log(response.status);
                    this.getProducts();
                })
                .catch(error => {
                    console.log(error);
                });
        },

        openAddDialog() {
            // Fetch category options when opening the dialog
            axios.get('https://localhost:7072/api/Categorys/Categorys')
                .then(response => {
                    this.categoryOptions = response.data.map(category => ({
                        text: category.CategoryName,
                        value: category.CategoryName,
                    }));
                    this.dialogAdd = true; // Open the dialog after fetching categories
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
            formData.append('newCategoryId', this.newProduct.newCategoryId);
            formData.append('promotion', this.newProduct.promotion);
            formData.append('origin', this.newProduct.origin);
            formData.append('warranty', this.newProduct.warranty);

            axios.post('https://localhost:7072/api/Products/AddProductWithImage', formData)
                .then(response => {
                    console.log('Product added successfully:', response.data);
                    this.dialogAdd = false;
                    this.getProducts();
                })
                .catch(error => {
                    console.error('Error adding product:', error);
                    if (error.response) {
                        console.error('Response data:', error.response.data);
                        console.error('Response status:', error.response.status);
                    }
                });
        },




        editProduct() {
            // Create a FormData object to send the updated product details
            const formData = new FormData();

            // Append updated product details to the form data
            formData.append('ProductsName', this.editedProduct.ProductsName);
            formData.append('Quatity', this.editedProduct.Quatity);
            formData.append('Price', this.editedProduct.Price);
            formData.append('ProductsDescription', this.editedProduct.ProductsDescription);
            formData.append('CategoryId', this.editedProduct.CategoryId);
            formData.append('promotion', this.editedProduct.promotion);
            formData.append('origin', this.editedProduct.origin);
            formData.append('warranty', this.editedProduct.warranty);

            // Make the API request to update the product
            axios.post(`https://localhost:7072/api/Products/UpdateProducts/${this.ProductsId}`, formData)
                .then(response => {
                    console.log('Product updated successfully:', response.data);
                    this.dialogEdit = false;
                    this.getProducts(); // Refresh the product list after updating
                })
                .catch(error => {
                    console.error('Error updating product:', error);
                    // Log more details about the error
                    if (error.response) {
                        console.error('Response data:', error.response.data);
                        console.error('Response status:', error.response.status);
                    }
                });
        },
    },
    watch: {
        currentItem: function () {
            this.ProductsId = this.currentItem.ProductsId;
            this.ProductsName = this.currentItem.ProductsName;
            this.Quatity = this.currentItem.Quatity;
            this.Price = this.currentItem.Price;
            this.ProductsDescription = this.currentItem.ProductsDescription;
            this.CategoryId = this.currentItem.CategoryId;
            this.ImagerUrl = this.currentItem.ImagerUrl;
            this.promotion = this.currentItem.promotion;
            this.origin = this.currentItem.origin;
            this.warranty = this.currentItem.warranty;
        }
    },
    created() {
        this.getProducts();
        this.getCategories();
    },
}
</script>
