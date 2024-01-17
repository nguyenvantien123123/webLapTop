<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          image="https://images2.thanhnien.vn/528068263637045248/2023/5/4/34458111963023783798192141564173599420883095n-16832155251681953012257.jpg"
          permanent
          theme="dark"
        >
          <v-list density="compact" style="text-align: justify"  nav>
            <v-list-item prepend-icon="mdi mdi-store" title="Quản lý sản phẩm" value="Quản lý sản phẩm"></v-list-item>
            <v-list-item prepend-icon="di mdi-order-bool-ascending-variant" title="Quản lý đơn hàng" value=""></v-list-item>
            <v-list-item prepend-icon="mdi mdi-currency-usd" title="Thống kê doanh số" value=""></v-list-item>
             <v-list-item prepend-icon="mdi mdi-account-group" title="Quản lý người dùng" value=""></v-list-item>
             <v-list-item prepend-icon=" mdi mdi-logout" title="Đăng xuất" value=""></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main style="height: "></v-main>
        
        <v-navigation-drawer image="https://png.pngtree.com/png-clipart/20230806/original/pngtree-laptop-logo-blue-logo-icon-white-presentation-vector-picture-image_9978789.png" style="width: 90px; height: 70px" ></v-navigation-drawer>
        <v-text-field  prepend-inner-icon="mdi mdi-magnify" label="  Search ..." ></v-text-field>
      </v-layout>
    </v-card>
  </template>