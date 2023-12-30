<template>
    <div class="default-page-wrapper">
        
      <DefaultNav/>
        
        <nav aria-label="Page navigation example">
            <div class="container">
                <div class="row d-flex" style="justify-content: center;align-items: center;">
                    <div class="col">
                        <div class="text-center">
                            <div class="alert d-flex" style="align-items: center;justify-content: center;background-color: #273849; color:white" role="alert">
                              <h2>Tacabaria - Narguilé</h2>
                              <div class="mx-2">
                                <img src="/smoke.png" style="width: 40px;">
                              </div> 
                            </div>
                            <div class="mt-3 mb-4 d-flex justify-content-center">
                              <img style="width: 200px;" src="/hr.png">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div class="card card-body" style="border: none;">
            <div class="row" style="padding: 0;">

                <div class="col-6" v-for="product in products" style="padding:4px;border: 1px solid #2738491f;border-radius: 21px;background-color: #29282803;">
                    
                  <div class="card mb-2">
                      <div class="card-body d-flex" style="flex-direction: column;">
                          <h5 class="card-title"><b>{{ product.title }}</b></h5>
                          <span class="card-text"><small class="bolder"><b>{{ product.weight }}</b></small></span>

                          <div class="d-flex justify-content-center mb-1 mt-1" style="align-items: center;">
                              <img class="items-card pulsating" alt="Logo" :src="`/upload_images/products/${product.image}`" 
                              @click="expandImage(`/upload_images/products/${product.image}`)" />
                          </div>

                          <div class="mt-1">
                              <button type="button" class="price btn position-relative">
                                R$ {{ product.value }}
                              </button>
                              <button type="button" class="mt-2 price btn position-relative" @click="addToCartWithShake(product)">
                                  <i class="fa-solid fa-cart-shopping"></i> Adicionar
                              </button>
                          </div>
                          
                          <p class="card-text mt-2"><small class="bolder">{{  product.additional }}</small></p>
                    </div>

                  </div>
                </div>
            </div>
        </div>

        <div id="cart" :class="{ 'cart-shake': cart.length > 0 }">
            <img src="/checklist.png" style="width:40px" class="pulsating-cart" @click="openCartModal">
        </div>

        
        <div v-if="isCartModalOpen" class="cart-modal">
            <div class="cart-modal-content">
                <span class="cart-close" @click="closeCartModal">&times;</span>
            
                <Cart ref="cartComponent" :cart="cart" :totalPrice="totalPrice" @update-cart="updateCart" />
                
            </div>
        </div>
        

        <div v-if="isModalOpen" class="modal">
            <span class="close" @click="closeModal">&times;</span>
            <img class="modal-content" :src="modalImageSrc" />
        </div>

        <div style="display: none;">
            <Cart ref="cartComponent" :cart="cart" :totalPrice="totalPrice" @update-cart="updateCart" />
        </div>


      <DefaultFooter/>

    </div>
</template>


<script>

import DefaultFooter from '../layouts/default/DefaultFooter.vue';
import DefaultNav from '../layouts/default/DefaultNav.vue';
import axios from 'axios';
import Cart from "./Cart.vue";

export default {
  components: {
    DefaultNav,
    DefaultFooter,
    Cart
  },

  data() {
    return {
        idCategory: '',
        category: {},
        tags: [],
        products: [],
        isModalOpen: false,
        modalImageSrc: '',
        cart: [],
        totalPrice: 0,
        isCartModalOpen: false,
    }
  },
  async mounted() {

        this.idCategory = this.$route.query.id;

        await this.getCategory();

        this.products = await this.getProducts();
        this.tags = await this.getTags();

        const savedCart = localStorage.getItem('cart');

        if (savedCart) {
            this.cart = JSON.parse(savedCart);
            this.calculateTotalPrice();
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
        addToCartWithShake(product) {
            this.addToCart(product);
            this.addShakeEffect();
        },
        addShakeEffect() {
            const cartIcon = document.getElementById('cart');
            cartIcon.classList.add('cart-shake');

            setTimeout(() => {
                cartIcon.classList.remove('cart-shake');
            }, 500);
        },
        openCartModal() {
            console.log("this.isCartModalOpen", this.isCartModalOpen);
            this.isCartModalOpen = true;
        },
        closeCartModal() {
            this.isCartModalOpen = false;
        },
        addToCart(product) {
        // Adiciona o produto ao carrinho
            this.cart.push({
                title: product.title,
                weight: product.weight,
                value: product.value,
                additional: product.additional
            });
            // Recalcula o preço total

            localStorage.setItem('cart', JSON.stringify(this.cart));

            this.calculateTotalPrice();
        },
        calculateTotalPrice() {
            // Calcula o preço total dos produtos no carrinho
            this.totalPrice = this.cart.reduce((total, product) => {
                return total + parseFloat(product.value);
            }, 0);
        },
        expandImage(imageSrc) {
            console.log("Cliquei", imageSrc);
            this.isModalOpen = true;
            console.log("this.isModalOpen", this.isModalOpen);
            this.modalImageSrc = imageSrc;
            console.log("this.modalImageSrc", this.modalImageSrc);
        },
        closeModal() {
            this.isModalOpen = false;
            this.modalImageSrc = '';
        },
        async getCategory() {
            const response = await axios.get(`/api/categories`)
            this.category = response.data;
            console.log("CAT", this.category = response.data);
        },
        async getTags() {
            const response = await axios.get(`/api/tags?idCategory=${this.idCategory}`)

            return response.data
        },
        async toggleTag(tag) {
            this.products = await this.getProducts(tag.id)

            console.log(this.products)
        },
        async getProducts(tagId) {

          console.log("tag", tagId);

            //axios.get(`/api/tags?idCategory=${this.idCategory}`)

          var url = `/api/products?promotion=false`

          if (tagId) {
              url = url + `&tagId=${tagId}`
          }

          const response = await axios.get(url);

          console.log("response", response);
          return response.data;


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
/* Aplicar a animação à imagem */
.items-card.pulsating {
  animation: pulse 2.5s infinite;
}


.modal {
  display: flex;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7); /* Cor de fundo semi-transparente */
}

/* Conteúdo do modal */
.modal-content {
  margin: auto;
  display: block;
  max-width: 80%;
  max-height: 80%;
}

/* Botão para fechar o modal */
.close {
  color: black;
  font-size: 50px;
  font-weight: bold;
  position: absolute;
  top: 270px;
  z-index: 100000000000000;
  right: 57px;
  cursor: pointer;
}

/* Efeito hover no botão de fechar */
.close:hover {
  color: #ccc;
}
.bolder {
  font-weight: 500;
}


.bebidas {
  padding: 0px 20px 10px 20px;
}

.price {
  color: white;
  font-weight: 700;
  background-color: #5c2680;
  width: 100%;
}

.items-card {
  width: 150px !important;
  height: 150px !important;
  border-color: #ebe4e4 !important;
  border: azure 2px solid;
  border-radius: 26px;
  background: #e3e3e3;
}

</style>
