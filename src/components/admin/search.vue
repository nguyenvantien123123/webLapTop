<template>
    <indexMenu></indexMenu>
    <v-data-table :items="items">
      <template v-slot:header.id="{ column }">
      </template>
    </v-data-table>
</template>
<script>
 import indexMenu from "../menuAdmin/indexMenu";
 export default{
        components: {
            indexMenu,
        },
    }
</script>