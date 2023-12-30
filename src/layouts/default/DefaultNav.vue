<template>
  
  <nav class="fixed-top" style="background-color: rgb(41 40 40) !important;">
      
      <div class="container" style="padding:15px;justify-content: center;align-items: center;align-content: center;">
        <div class="row" style="align-items: center;">
          
          <div class="col-8" style="display: flex;justify-content: center;">
              <img src="/sniper_text.png" style="width: 180px;">
          </div>

          <div class="col-4">
            <button class="btn" style="background-color:white;border: none;">
              <router-link to="/">
                <a class="page-link">
                  <i class="fa-solid fa-home"></i> <b>Início</b>
                </a>
              </router-link>
            </button>
          </div>
        
        </div>
    </div>

  </nav>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>

.page-link{
  border-color: white;
  background-color: white;
  color: black;
  text-decoration: none;
}

</style>
