<template>
  
  <div class="container-fluid">

    <div class="row">
      
      <div class="col-12">
        <div class="d-flex justify-content-center mb-3 mt-2">
          <img src="/logo2.png" style="width: 150px;">
        </div>
        
        <h3 style="text-align: center;text-align: center;background: rgb(41 40 40);font-weight: 700;border-radius: 7px;color:white">Promoções do Dia</h3>
        <hr>

        <div id="carouselExampleRide" class=" container carousel slide" data-bs-ride="true">
          
          <div class="carousel-inner">
            
            <div v-for="(p,idx) in promotedProducts" class="col-12 carousel-item" :class="{active: idx===0}" >
              <div class="row d-flex" style="justify-content: center;">
                  <p style="text-align: center;"><b>{{p.title}}</b><br><b>R$ {{p.value}}</b></p>
                  <img style="width: 120px;" :src="`upload_images/products/${p.image}` " class="" alt="...">
              </div>
            </div>

          </div>

          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>

          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
          
        </div>

      </div>
    
    </div>


        

    <hr class="mt-3">

    <div class="card-header text-center" style="background-color: rgb(41 40 40);color: white;font-weight: 500;">
        Bem vindo ao nosso Cardápio Digital<br>
    </div>

 
    <div class="categorias text-center">

      <div class="mt-2">
        <small style="font-size: 12px;"><b>Acesse as categorias, selecione os produtos e finalize sua compra.</b></small>
      </div>

      <div id="cart" style="display: none;">
        <Cart :cart="cart" :totalPrice="totalPrice" @clear-cart="clearCart" />
      </div>
      
      <h3 class="mt-4 mb-3"><b>Por Categorias</b></h3>
      
      <div class="text-center mt-3">
        <div class="row align-items-start">
          <div v-for="category in categories" class="item col mb-2 mt-2 mx-1" style="position:relative;border: 1px solid #d8d8d84f;border-radius: 10px;">
            <div>
              <router-link :to="`/listproduct?id=${category.id}`">
                <img alt="Logo" :src="`upload_images/categories/${category.image}` " loading="lazy" class="text-center" style="width: 100px;height: 100px;" /></router-link>
                <br>
                <span>
                  <small style="font-weight:bold">{{ category.name }}</small>
                </span>
            </div>
          </div>         

        </div>
      </div>
      
    </div>

    <div id="cart" class="cart-icon" @click="openCartModal">
      <i class="fa-solid fa-shopping-cart pulsating-cart"></i>
    </div>

    <div v-if="isCartModalOpen" class="cart-modal">
        <div class="cart-modal-content">
            <span class="cart-close" @click="closeCartModal">&times;</span>
        
            <Cart ref="cartComponent" :cart="cart" :totalPrice="totalPrice" @clear-cart="clearCart" />
            
        </div>
    </div>
  
  </div>



  
</template>

<script>

import Cart from '../components/Cart.vue'
import axios from 'axios'

export default {
    data() {
        return {
            categories: [],
            promotedProducts: [],
            cart: [], // Seus dados do carrinho
            totalPrice: '',
            isCartModalOpen: false,
        }
    },
    components: {
      Cart
    },
    async mounted() {
      await this.getCategory();
      await this.getPromotion();

      const savedCart = localStorage.getItem('cart');
    
      if (savedCart) {
          this.cart = JSON.parse(savedCart);
          this.calculateTotalPrice();
      }

    },
    methods: {
      openCartModal() {
          console.log("this.isCartModalOpen", this.isCartModalOpen);
          this.isCartModalOpen = true;

          // Passe as informações do carrinho para o modal
          const cartComponent = this.$refs.cartComponent; // Referência ao componente do carrinho
          if (cartComponent) {
              cartComponent.cart = this.cart; // Atualize os itens do carrinho no componente do carrinho
              cartComponent.totalPrice = this.totalPrice; // Atualize o preço total no componente do carrinho
          }
      },
      closeCartModal() {
          this.isCartModalOpen = false;
      },
      clearCart() {
        // Limpar carrinho
        this.cart = [];
        this.totalPrice = 0;
      },
      calculateTotalPrice() {
          // Calcula o preço total dos produtos no carrinho
          this.totalPrice = this.cart.reduce((total, product) => {
              return total + parseFloat(product.value);
          }, 0);
      },
      async getCategory() {
            const response = await axios.get(`/api/categories`)
            this.categories = response.data;
            console.log(this.categories);
      },
      async getPromotion() {
          const response = await axios.get(`/api/products?promotion=true&disabled=false`)
          this.promotedProducts = response.data;
          console.log(this.promotedProducts);
      }
    },

}
</script>

<style scoped>

.cart-shake {
  animation: shake 0.4s;
}

@keyframes shake {
  10%, 90% {
    transform: translateX(-5px);
  }
  20%, 80% {
    transform: translateX(5px);
  }
  30%, 50%, 70% {
    transform: translateX(-5px);
  }
  40%, 60% {
    transform: translateX(5px);
  }
}

#cart{
  position: fixed;
  bottom: 10px;
  right: 8px;
  color: white;
  z-index: 1000000;
  font-size: 17px;
  background: #292828;
  padding: 12px;
  border-radius: 10px;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1); 
  }
}

.cart-order{
    position: absolute;
    bottom: 20px !important;
}
.cart-modal {
  display: flex;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
}

.cart-modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    overflow: auto;
    position: relative;
    height: 500px;
}

.cart-modal-content h2 {
  margin-top: 0;
}

.cart-modal-content ul {
  padding: 0;
}

.cart-modal-content li {
  list-style: none;
  margin-bottom: 5px;
}

.cart-modal-content p {
  font-weight: bold;
  margin-top: 10px;
}

.cart-modal-content button {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cart-modal-content button:hover {
  background-color: #333;
}

.cart-close {
    color: black;
    font-size: 50px;
    font-weight: bold;
    position: absolute;
    top: 0px;
    z-index: 100000000000000;
    right: 25px;
    cursor: pointer;
}

a{
  color: black;
  text-decoration: none;
}

.inner img{
  width: 100%;
  height: 100%;
  -webkit-transition: -webkit-transform .5s ease;
  transition: transform .5s ease;
}

.inner:hover img{
  -webkit-transform: scale(1.1);
   transform: scale(1.1);
}


</style>
