
<template>
    <body>
        <!-- Header -->
        <div id="top-nav" class="justify-content-center navbar navbar-static-top mb-5" style="height: 80px;background-color: #212529;">
            <div class="d-flex px-3">
                <img alt="Logo" src="../../public/logo2.png" class="text-center" style="width:50px" />
            </div>
            <div class="d-flex">
                <h2 style="color: white;margin-top:7px">Sniper Tabacaria</h2>
            </div>
        </div>

        <MenuLateral></MenuLateral>

        <section id="main">
        
            <div class="container">

                <div class="row" style="justify-content: center;">

                    <div class="col-4">
                        <div class="card bg-c-blue order-card">
                            <div class="card-block">
                                <h5 style="">Categorias Cadastrados</h5>
                                <div class="d-flex mt-3" style="justify-content: space-between;">
                                    <i class="fa-solid fa-list"></i>
                                    <h2 class="text-right"><span>{{ categories }}</span></h2>
                                </div>
                        
                            </div>
                        </div>
                    </div>
            
                    <div class="col-4">
                        <div class="card bg-c-green order-card">
                            <div class="card-block">
                                <h5 style="">Produtos Cadastrados</h5>
                                <div class="d-flex mt-3" style="justify-content: space-between;">
                                    <i class="fa-solid fa-pizza-slice"></i>
                                    <h2 class="text-right"><span>{{ products }}</span></h2>
                                </div>
                        
                            </div>
                        </div>
                    </div>
            
	            </div>

                <hr>

            <div style="text-align: center;">
                <h3>Bem vindo ao Dashboard - Absolem Tacabaria & Bebidas</h3>

                <h5 class="mt-3 mb-4">Tutorial de como utilizar a plataforma</h5>

                <div class="container" style="padding:30px;border: 1px solid #212529; border-radius:10px">
                    <div class="row">
                        <ul style="text-align: left;">
                            <li>1. Cadastre uma Categoria</li>
                            <li>2. Cadastre uma SubCategoria (se for necessário). Se a Categoria for bebida, você pode cadastrar Lata | Garrafa ...</li>
                            <li>3. Cadastre um produto, selecione sua Categoria e SubCategoria, se houver.</li>
                        </ul>
                    </div>
                </div>
                
            </div>
            


            </div>

        </section>

        
    </body>
</template>

<script>

import MenuLateral from './components/MenuLateral.vue'
import axios from 'axios'

export default {
  components: {
    MenuLateral
  },
  data() {
    return {
        products: 0,
        categories: 0
    }
  },
  async mounted() {
    await this.getDashboardInfo()
  },
  methods: {
    async getDashboardInfo() {
        const response = await axios.get('/api/dashboard')

        this.products = response.data.products
        this.categories = response.data.categories
    }
  }
}
</script>
  
<style scoped>

section#main{ 
    margin-left: 250px;
    
}

.order-card {
    color: #fff;
}

.bg-c-blue {
    background: linear-gradient(45deg,#b82230,#de7c85);
}

.bg-c-green {
    background: linear-gradient(45deg,#b82230,#de7c85);
}


.card {
    border-radius: 5px;
    -webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4,26,55,0.16);
    box-shadow: 0 1px 2.94px 0.06px rgba(4,26,55,0.16);
    border: none;
    margin-bottom: 30px;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

.card .card-block {
    padding: 25px;
}

.order-card i {
    font-size: 26px;
}


</style>
  