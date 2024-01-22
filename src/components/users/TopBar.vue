<template>
  <v-app>
  <v-main>
    <div>
      <v-app-bar :elevation="0" color="" class="">
        <a href="" class="text-decoration-none"><h3 class="headline mb-0 text-red">LapTop Uông Bí</h3></a>
        <v-spacer></v-spacer>
        <v-btn>Dell</v-btn>
        <v-btn>Acer</v-btn>
        <v-btn>Asus</v-btn>
        <v-btn>HP</v-btn>
        <v-btn>Lenovo</v-btn>

        <v-card-text>
      <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="Chưa có  gì đâu"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
      ></v-text-field>
    </v-card-text>
        
        <v-toolbar-items>
          <v-btn @click="goToCartPage" >
            <v-badge content="5" color="red">
              <v-icon>mdi mdi-cart-outline</v-icon>
            </v-badge>
                
          </v-btn>
          <v-card
    class="mx-auto"
    color="grey-lighten-3"
    max-width="400"
  ></v-card>

  <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-dialog v-model="loginDialog" persistent max-width="600px">
            <v-card>
              <v-card-title class="headline">Đăng nhập</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field v-model="UserName" label="Tên đăng nhập" required></v-text-field>
                  <v-text-field v-model="PassWord" label="Mật khẩu" type="password" required></v-text-field>
                  <v-btn type="submit" color="primary">Đăng nhập</v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="openRegisterDialog" color="primary">Chưa có tài khoản, đăng ký ngay</v-btn>
                <v-btn @click="loginDialog = false" color="primary">Đóng</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="registerDialog" persistent max-width="600px">
            <v-card>
              <v-card-title class="headline">Đăng ký</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="register">
                  <v-text-field v-model="UserName" label="Tên đăng nhập" required></v-text-field>
                  <v-text-field v-model="PassWord" label="Mật khẩu" type="password" required></v-text-field>
                  <v-text-field v-model="FullName" label="Họ và tên" required></v-text-field>
                  <v-text-field v-model="Phone" label="Số điện thoại" required></v-text-field>
                  <v-btn type="submit" color="primary">Đăng ký</v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="registerDialog = false" color="primary">Đóng</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn @click="loginDialog = true" color="primary">Đăng nhập</v-btn>
        </v-col>
      </v-row>
    </v-container>

        </v-toolbar-items>
      </v-app-bar>
      
      
    </div>
    
  </v-main>
  </v-app>
        
    
</template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'TopBar' ,
    data() {
      return {
        form: false,
        email: null,
        password: null,
        loading: false,
        loginDialog: false,
        registerDialog: false,
        UserName: '',
        PassWord: '',
        FullName: '',
        Phone: '',

        search: '',
        laptopCategories: [
          { id: 1, name: 'Laptop Dell', icon: 'mdi-laptop' },
          { id: 2, name: 'Laptop Acer', icon: 'mdi-laptop' },
          { id: 3, name: 'Laptop Asus', icon: 'mdi-laptop' },
          { id: 4, name: 'Laptop HP', icon: 'mdi-laptop' },
          { id: 5, name: 'Laptop Lenovo', icon: 'mdi-laptop' },
        ],
        silders: [
          {
            id: 1,
            url: "https://hanoicomputercdn.com/media/banner/05_Dec42b8748f5d09ddb7b69643958c5f7580.jpg"
          },
          {
            id: 2,
            url: "https://hanoicomputercdn.com/media/banner/10_Nov54996437df548ee7736b9ec3939ffc2b.jpg"
          },
          {
            id: 3,
            url: "https://hanoicomputercdn.com/media/banner/11_Nov7b239a58cc35a66d8b8b572522be1bef.jpg"
          }
        ]
      }
    },
    methods: {

      goToCartPage() {
      this.$router.push('/cart')
      },
        async login() {
            console.log('Đăng nhập thành công:');
            this.loginDialog = false;
            console.log(this.UserName)
      try {
        const response = await axios.post('https://localhost:44384/api/User', {
            UserName: this.UserName,
            PassWord: this.PassWord,
            
        });
      } catch (error) {
          console.error('Lỗi đăng nhập:', error);
          console.log(this.UserName)
      }
    },
    async register() {
      try {
        const response = await axios.post('https://localhost:44384/api/User', {
          username: this.UserName,
          password: this.PassWord,
          fullname: this.FullName,
          phone: this.Phone,
        });
        console.log('Đăng ký thành công:', response.data);
        this.registerDialog = false;
      } catch (error) {
        console.error('Lỗi đăng ký:', error);
      }
    },
    openRegisterDialog() {
      this.registerDialog = true;
    },
  
    
  

      onSubmit () {s
        if (!this.form) return

        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
      required (v) {
        return !!v || 'Field is required'
      },
    },
  }
  </script>
  
  <style scoped>
  .headline {
    padding: 20px;
  }
  
  .mt-5 {
    margin-top: 20px;
    border-radius: 15px;
  }
  
  .text-decoration-none {
    text-decoration: none;
  }
  
  .text-primary {
    color: #2196F3;
  }
  
  /* Additional styles for the search bar */
  .search-bar {
    width: 200px; /* Adjust the width as needed */
    border-radius: 25px; /* Set border-radius for rounding */
    margin: 0 auto; /* Center the search bar */
  }
  
  .v-input__icon--append .v-icon {
    font-size: 40px; /* Adjust the icon size as needed */
  }
  
  /* Additional styles for the menu column */
  .menu-col {
    background-color: #f0f0f0;
  }
  .menu-item {
          width: 100%; /* Chiều rộng 100% */
          box-sizing: border-box; /* Đảm bảo chiều rộng bao gồm cả padding và border */
      }
  </style>
  