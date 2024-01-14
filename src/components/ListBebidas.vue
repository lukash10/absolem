<template>
    <div class="default-page-wrapper">
        
      <DefaultNav/>
        
        <nav aria-label="">
          <div class="container">
              <div class="row d-flex" style="justify-content: center;align-items: center;">
                  <div class="col">
                      <div class="text-center">
                          <div class="alert d-flex" style="align-items: center;justify-content: center;background-color: #273849; color:white" role="alert">
                            <h2>Bebidas & Gelo</h2>
                            <div class="mx-2">
                              <img src="/smoke.png" style="width: 40px;">
                            </div> 
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="d-flex justify-content-center mb-3">
            <a href="/listBebidas"><button class="btn" style="background: #5a257e;color: white;"><span class="text-center" style="text-decoration: ;"><b>Limpar Filtros <i class="fa-solid fa-eraser"></i></b></span></button></a>
          </div>
        </nav>

        <div class="text-center">

        <span style="font-weight: 600">Selecione por: </span>
          <button v-for="tag in tags" @click="toggleTag(tag)" class="btn btn-calacio">{{ tag.name }}</button>&nbsp;
        </div>

        <br>

        <div class="card">
          <div class="row justify-content-center">
              <div v-for="product in products" class="col-6 mx-1 my-1 d-flex align-items-stretch" style="width:46%;">
                <div class="card mb-2" style="border: 1px solid #2738491f; border-radius: 21px; background-color: #29282803; height: 100%;">
                  <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title" style="text-wrap: balance;font-size: 14px;"><b>{{ product.title }}</b></h5>
                    <span class="card-text"><small class="bolder"><b>{{ product.weight }}</b></small></span>

                    <div class="d-flex justify-content-center my-1">
                      <img class="items-card pulsating" alt="Logo" :src="`/upload_images/products/${product.image}`" @click="expandImage(`/upload_images/products/${product.image}`)" />
                    </div>

                    <div class="mt-1">
                      <button class="price btn position-relative">
                        R$ {{ product.value }}
                      </button>
                      <button type="button" class="pulsating mt-2 price btn position-relative" @click="addToCartWithShake(product)">
                        <i class="fa-solid fa-cart-shopping"></i> Adicionar
                      </button>
                    </div>
                    
                    <p class="card-text"><small class="bolder">{{ product.additional }}</small></p>
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

        


      <DefaultFooter/>

    </div>
</template>


<script>

import DefaultFooter from '../layouts/default/DefaultFooter.vue';
import DefaultNav from '../layouts/default/DefaultNav.vue';
import axios from 'axios';
import Cart from "./Cart.vue";

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
components: {
  DefaultNav,
  DefaultFooter,
  Cart,
  Carousel,
  Slide,
  Pagination,
  Navigation,
},
data() {
  return {
    tags: [],
    products: [],
    isModalOpen: false,
    modalImageSrc: '',
    cart: [],
    totalPrice: 0,
    isCartModalOpen: false,
  }
},
computed: {
  //  
},
async mounted() {

  await this.getCategory();

  this.tags = await this.getTags();
  
  const bebidasCategory = this.categories.find(category => category.name === "Bebidas");

  if (bebidasCategory) {
      const tags = await this.getTags(bebidasCategory.id);
      console.log("Tags da categoria Bebidas:", bebidasCategory.id);
      this.products = await this.getProducts(bebidasCategory.id);
  }

  //console.log("Productsaa", this.products);
  //console.log("TAGSaa", this.tags);

  const savedCart = localStorage.getItem('cart');

  if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.calculateTotalPrice();
  }
      
},
methods: {
  updateCart(updatedCart) {

    this.cart = updatedCart;
    localStorage.setItem('cart', JSON.stringify(this.cart));
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
      

      localStorage.setItem('cart', JSON.stringify(this.cart));

      this.calculateTotalPrice();
  },
  calculateTotalPrice() {
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
    this.categories = response.data;

  },
  async getTags() {

    const response = await axios.get(`/api/tags?idCategory=f0490fdb-dce4-4fc0-8d9a-52d6332f1ee0`)
    console.log("Response TAGS", response);

    return response.data
  },
  async toggleTag(tag) {
    try {
      
      var url = `/api/products?promotion=false`;

      if (tag) {
        url = url + `&tagId=${tag.id}`
      }
      console.log("url", tag.id);
      const response = await axios.get(url);
      console.log("RESPONSE", response);
    
      this.products = response.data;
    } catch (error) {
      console.error('Erro ao buscar os produtos da tag:', error);
    }
  },
  async getProducts(categoryId) {

    //console.log("tag", tagId);
    var url = `/api/products?promotion=false`

    // if (tagId) {
    //     url = url + `&tagId=${tagId}`
    // }

    if (categoryId) {
        url = url + `&categoryId=${categoryId}`
    }

    const response = await axios.get(url);
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
  border-radius: 26px;
  border: none;
}

</style>
