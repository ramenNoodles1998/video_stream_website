<template>
  <div id="app">
    <div class="container">
      <form enctype="multipart/form-data" novalidate>
        <h1>Upload Video</h1>
        <div class="dropbox">
          <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="fileUpload($event.target.name, $event.target.files[0])"
            accept="mp4/*">
        </div>
      </form>
    </div>
    <video id="videoPlayer" width="650" controls muted="muted" autoplay>
      <source src="http://localhost:3000/video" type="video/mp4" />
    </video>
  </div>
</template>

<script>
//const chunk_size = 10 ** 7 //1MB
const api = 'http://localhost:3000'

export default {
  
  name: 'App',

  data: () => ({
    file: null,
    isSaving: false,
    uploadFieldName: ''
  }),
  //get file
  //split into chunks
  // send each chunk to backend
  //

  methods: {
    async fileUpload(fieldName, file) {
      this.isSaving = true
      this.file = file
      this.uploadFieldName = fieldName

      //for(let i = 0; i < file.size; i += chunk_size) {
      this.axios.post(api, file)
      //}
      
      //this.blob.push(await this.axios.post(api, file.slice(file.size - (file.size % chunk_size), file.size - (file.size % chunk_size))))

      console.log(this.blob)
    }
  }
}
</script>

<style>

</style>