<template>
  <div id="app">
    <div class="container">
      <form enctype="multipart/form-data" novalidate onsubmit="return false">
        <input type="file" ref="inputFile" :disabled="isSaving" @change="fileUpload($event.target.name, $event.target.files[0])" accept="mp4/*">

        <button @click="fileSubmit">Submit Video</button>
      </form>
    </div>

    <video id="videoPlayer" width="650" controls muted="muted" autoplay>
      <source :src="api" type="video/mp4" />
    </video>
  </div>
</template>

<script>
//const chunk_size = 10 ** 7 //1MB

export default {
  
  name: 'App',

  data: () => ({
    file: null,
    isSaving: false,
    videoTitle: '',

    api: 'http://localhost:3000/'
  }),

  methods: {
    fileUpload(fieldName, file) {
      this.isSaving = true
      this.file = file

      this.isSaving = false
    },

    async fileSubmit() {
      this.isSaving = true

      await this.axios.post(this.api, this.file)

      this.$refs.inputFile.value = null

      this.isSaving = false
      this.file = null
    }
   
  }
}
</script>

<style>

</style>