<template>
  <v-app>
    <app-bar></app-bar>
    <custom-table></custom-table>
  </v-app>
</template>

<script>
  import AppBar from "@/components/AppBar";
  import CustomTable from "@/components/TotalClientTable";

  export default {
    name: 'App',

    components: {
      AppBar,
      CustomTable,
    },

    data: () => ({}),
  };
</script>
