<template>
  <div>
    <v-img class="mx-auto my-6" max-width="228" src="https://bantranh.com/wp-content/uploads/2019/02/logo-2.png"></v-img>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Đăng nhập</div>
      <v-text-field v-model="username" density="compact" placeholder="Tên đăng nhập" prepend-inner-icon="mdi mdi-account-edit" variant="outlined"></v-text-field>
      <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'" density="compact" placeholder="Mật khẩu" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"></v-text-field>
      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">Forgot login password?</a>
      </div>
      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="login">
        Log In
      </v-btn>
      <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" href="singin" rel="noopener noreferrer" target="_blank">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      visible: false,
      username: '',
      password: '',
    };
  },

  methods: {
    async login() {
      try {
        if (!this.username || !this.password ) {
          alert("Vui lòng điền đầy đủ thông tin.");
          return;
        }
        const loginData = {
          UserName: this.username,
          UserPassword: this.password
        };

        const response = await axios.post('https://localhost:7072/api/Login/Login', loginData);

        const { Token, Message, RedirectUrl, Role } = response.data;
        // Store the token securely (e.g., Vuex store or localStorage)
        // Optionally, you can show a success message
        alert(Message);
        alert(Role);
        // Redirect the user based on the user role
        if (Role === 'admin') {
          this.$router.push('/admin/index');
        } else {
          this.$router.push('/users/trangchu');
        }
      } catch (error) {
        console.error('Login failed', error);
        // Handle the error, e.g., show an error message to the user
      }
    },
  },

  
};
</script>
