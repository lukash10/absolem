<template>
  
  <div class="container-fluid" style="padding-left: 5px;padding-right: 5px;">
    <div class="row">
      <div class="col-12">

        <div class="d-flex justify-content-center mb-3 mt-2">
          <img src="/logo2.png" style="width: 150px;">
        </div>
        
        <h5 class="background-absolem" style="text-align: center;text-align: center;font-weight: 700;border-radius: 5px;color:white">Promoções do Dia</h5>
      
        <div id="carouselExampleRide" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            
            <div v-for="(p,idx) in promotedProducts" class="col-12 carousel-item" :class="{active: idx===0}" >
              <div class="row d-flex" style="justify-content: center;">
                  <p style="text-align: center;"><b>{{p.title}}</b><br><b>R$ {{p.value}}</b></p>
                  <img style="width: 120px;" :src="`upload_images/products/${p.image}` " class="" alt="...">
              </div>
            </div>

          </div>

          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
            <i class="fa-solid fa-arrow-left" style="color: #3f3659 !important;font-size: 30px;"></i>
          </button>

          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
            <i class="fa-solid fa-arrow-right" style="color: #3f3659 !important;font-size: 30px;"></i>
          </button>
          
        </div>

      </div>
    </div>

    <div class="mt-3 mb-4 d-flex justify-content-center">
      <img style="width: 200px;" src="/hr.png">
    </div>

    <div class="categorias">
      
        <div class="categories-wrapper d-flex" style="justify-content: space-around;">

          <div class="col-6 d-flex p-2" style="width: 47% !important;align-items: center;justify-content: center;flex-direction: column;background: #5b267f;color: white;font-weight: 600;border-radius: 10px;">
              <div class="pulsating d-flex" style="flex-direction: column;">
                <router-link to="/listTabacaria" style="color:white">
                  <div class="text-center">
                    <span>Tabacaria</span>
                  </div>
                  <img src="/public/categorias/narguile.png" style="width: 100px;">
                </router-link>
              </div>
              <div id="options" style="height: 28px;border-radius: 12px;font-weight: 500;background: #dbdbdb4f;width: 85%;display: flex;justify-content: space-evenly;align-items: center;">
                <div>
                  <router-link to="/listTabacaria" style="color:white">
                    <span>Ver opções</span>
                  </router-link>
                </div>
                <div>
                  <i class="fa-solid fa-angle-right"></i>
                </div>
              </div>
          </div>

          <div class="col-6 d-flex p-2" style="width: 47% !important;align-items: center;justify-content: center;flex-direction: column;background: #456798;color: white;font-weight: 600;border-radius: 10px;">
              <div class="pulsating">
                <router-link to="/listBebidas" style="color:white">
                  <div class="text-center d-flex" style="flex-direction: column;">
                    <span>Bebidas</span>
                  </div>
                  <img src="/public/categorias/bebidas.png" style="width: 100px;">
                </router-link>  
              </div>
              <div id="options" style="height: 28px;border-radius: 12px;font-weight: 500;background: #dbdbdb4f;width: 85%;display: flex;justify-content: space-evenly;align-items: center;">
                <div>
                  <router-link to="/listBebidas" style="color:white">
                    <span>Ver opções</span>
                  </router-link>
                </div>
                <div>
                  <i class="fa-solid fa-angle-right"></i>
                </div>
              </div>
          </div>

        </div>

        <div class="categories-wrapper-sub d-flex mt-3" style="justify-content: space-around;">

          <div class="col-5 d-flex p-2" style="width: 31% !important;align-items: center;justify-content: center;flex-direction: column;color: black;font-weight: 600;border-radius: 10px;">
              
              <img src="/public/categorias/cigarros.png" style="width: 70px;">
              <div id="options" style="height: 28px;border-radius: 12px;font-weight: 500;width: 85%;display: flex;justify-content: space-evenly;align-items: center;">
                <div>
                  <span><b>Cigarros</b></span>
                </div>
                <div>
                  <i class="fa-solid fa-angle-right"></i>
                </div>
              </div>
          </div>

          <div class="col-4 d-flex p-2" style="width: 31% !important;align-items: center;justify-content: center;flex-direction: column;color: black;font-weight: 700;border-radius: 10px;">
            
              <img src="/public/categorias/pods.png" style="width: 70px;">
              <div id="options" style="height: 28px;border-radius: 12px;font-weight: 500;width: 85%;display: flex;justify-content: space-evenly;align-items: center;">
                <div>
                  <span><b>Pods</b></span>
                </div>
                <div>
                  <i class="fa-solid fa-angle-right"></i>
                </div>
              </div>
          </div>

          <div class="col-4 d-flex p-2" style="width: 31% !important;align-items: center;justify-content: center;flex-direction: column;color: black;font-weight: 600;border-radius: 10px;">
              
              <img src="/public/categorias/gelo.png" style="width: 70px;">
              <div id="options" style="height: 28px;border-radius: 12px;font-weight: 500;width: 85%;display: flex;justify-content: space-evenly;align-items: center;">
                <div>
                  <span><b>Gelo</b></span>
                </div>
                <div>
                  <i class="fa-solid fa-angle-right"></i>
                </div>
              </div>
          </div>

          </div>
        

    </div>

    <div class="categorias-essencias text-center">
      
      <h3 class="mt-4 mb-3 pulsating">
        <b>Tabacaria - Essências</b>
      </h3>
      
      <div class="text-center mt-3">
        <div class="row align-items-start" style="margin: 1px;">
          <div v-for="category in categories" class="item col mb-2 mt-2 mx-1" style="position:relative;border: 1px solid #d8d8d84f;border-radius: 10px;">
            <div>
              <router-link :to="`/listproduct?id=${category.id}`">
                <img alt="Logo" :src="`upload_images/categories/${category.image}` " loading="lazy" class="text-center" style="width: 100px;height: 100px;" />
              </router-link>
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
      <img src="/checklist.png" style="width:40px" class="pulsating-cart">
    </div>

    <div v-if="isCartModalOpen" class="cart-modal">
        <div class="cart-modal-content">
            <span class="cart-close" @click="closeCartModal">&times;</span>
            <Cart ref="cartComponent" :cart="cart" :totalPrice="totalPrice" @clear-cart="clearCart" @update-cart="updateCart" />
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

      const currentPath = window.location.pathname;
      const desiredPath = '/';

      console.log("Curr", currentPath);

      if (currentPath === desiredPath) {
      
          const slideNextButton = document.querySelector('#carouselExampleRide [data-bs-slide="next"]');

          if (slideNextButton) {
            setInterval(() => {
              slideNextButton.click();
            }, 4000);
          } else {
            console.log('Elemento do botão de slide não encontrado.');
          }
        }

    },
    methods: {
      updateCart(updatedCart) {
        this.cart = updatedCart;
        // Atualize o localStorage se desejar manter os dados entre sessões
        localStorage.setItem('cart', JSON.stringify(this.cart));
        // Recalcula o preço total com base no carrinho atualizado
        this.calculateTotalPrice();
      },
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

#cart{
  position: fixed;
  bottom: -2px;
  right: -5px;
  color: white;
  z-index: 1000000;
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

.pulsating {
  animation: pulse 1.5s infinite;
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

</style>
