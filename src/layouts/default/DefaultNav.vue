<template>
  
  <nav class="fixed-top background-absolem">
      
      <div class="container" style="padding:15px;justify-content: center;align-items: center;align-content: center;">
        <div class="row" style="align-items: center;">
          
          <div class="col-8" style="display: flex;justify-content: flex-start;">
              <span style="color:white; font-size:14px"><b>Absolem - Tabacaria & Bebidas</b></span>
          </div>

          <div class="col-4">
            <button class="btn" style="background-color:white;border: none;">
              <router-link to="/" style="color:black;text-decoration: none !important;">
                <a>
                  <i class="fa-solid fa-home" style="color:#5b257f"></i> <b>Início</b>
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
