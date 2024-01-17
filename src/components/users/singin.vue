<template>
  <div>
    <v-img class="mx-auto my-6" max-width="228" src="https://bantranh.com/wp-content/uploads/2019/02/logo-2.png"></v-img>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Đăng kí</div>

      <v-text-field v-model="newUserName" density="compact" placeholder="Tên đầy đủ" prepend-inner-icon="mdi mdi-account-edit" variant="outlined" ></v-text-field>
      <v-text-field v-model="newUserPassword" density="compact" placeholder="Mật khẩu" prepend-inner-icon="mdi mdi-lock-outline" :type="visible ? 'text' : 'password'" @click:append-inner="visible = !visible" variant="outlined"></v-text-field>
      <v-text-field v-model="newUserPhone" density="compact" placeholder="Số điện thoại" prepend-inner-icon="mdi mdi-phone" variant="outlined"></v-text-field>
      <v-text-field v-model="newUserEmail" density="compact" placeholder="Email" prepend-inner-icon="mdi mdi-email-outline" variant="outlined"></v-text-field>
      <v-text-field v-model="newUserAddress" density="compact" placeholder="Địa chỉ" prepend-inner-icon="mdi mdi-map-marker" variant="outlined"></v-text-field>

      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="registerUser">
        Đăng ký
      </v-btn>

      <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" href="login" rel="noopener noreferrer" target="_blank">
          Đăng nhập ngay <v-icon icon="mdi-chevron-right"></v-icon>
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
    newUserName: '',
    newUserPassword: '',
    newUserPhone: '',
    newUserEmail: '',
    newUserAddress: '',
  };
},
methods: {
  async registerUser() {
    try {
      if (!this.newUserName || !this.ValidatePassword(this.newUserPassword) || !this.newUserPhone || !this.ValidateEmail(this.newUserEmail) || !this.newUserAddress) {
          alert("Vui lòng điền đầy đủ thông tin và mật khẩu phải có ít nhất 6 kí tự.");
          return;
        }                                         
      // Kiểm tra xem tên người dùng hoặc email đã tồn tại chưa
      const checkResponse = await axios.get(`https://localhost:7072/api/Users/CheckUserExists?newUserEmail=${encodeURIComponent(this.newUserEmail)}`);

      if (checkResponse.data.exists) {
        alert("Tên người dùng hoặc Email đã tồn tại. Vui lòng chọn một tên người dùng hoặc Email khác.");
        return;
      }
      // 
      // Nếu tên người dùng hoặc email không được sử dụng, hãy tiến hành đăng ký
    const isValidEmail = this.ValidateEmail(this.newUserEmail);

    if (!isValidEmail) {
        // Show an error message or take appropriate action for invalid email
        alert("Email không hợp lệ. Vui lòng kiểm tra lại.");
        return;
    }
      const formData = new FormData();
      formData.append('newUserName', this.newUserName);
      formData.append('newUserPassword', this.newUserPassword);
      formData.append('newUserPhone', this.newUserPhone);
      formData.append('newUserEmail', this.newUserEmail);
      formData.append('newUserAddress', this.newUserAddress);
      const response = await axios.post(`https://localhost:7072/api/Users/PostUsers?newUserName=${this.newUserName}&newUserPassword=${this.newUserPassword}&newUserPhone=${this.newUserPassword}&newUserEmail=${this.newUserEmail}&newUserAddress=${this.newUserAddress}`, formData);
      console.log('Registration successful', response.data);
      // Optionally, you can navigate the user to another page upon successful registration
      alert("Đăng ký thành công");
      this.$router.push('/users/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  },
  // check Email hợp lệ
  ValidateEmail(email) {
    // Validate email function
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(email)) {
      return true;
    }
    return false;
  },
  // check mật khẩu
  ValidatePassword(password) {
      // Validate password length function
      return password.length >= 6;
    },
},
};
</script>

