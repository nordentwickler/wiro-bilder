<template>
  <div class="text-center bg-purple-800 p-8 text-white">
    <p class="mb-6">If this form reactive, Vue works!</p>
    <input class="mb-6 p-2 text-black" type="text" v-model="message">
    <p>{{ message }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'Hello Vue. Change me!'
      }
    },
    mounted() {
      console.log('Component mounted.')
    }
  }
</script>
