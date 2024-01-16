<template>
    <div class="default-page-wrapper">
        
      <DefaultNav/>
        
        <nav aria-label="">
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
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center mb-3">
              <a href="/listTabacaria"><button class="btn" style="background: #5a257e;color: white;"><span class="text-center" style="text-decoration: ;"><b>Limpar Filtros <i class="fa-solid fa-eraser"></i></b></span></button></a>
            </div>
          </nav>

        <div id="categoryEssences" class="container" style="background: #2738490a;padding: 20px;border-radius: 20px;">
          <div class="row">
            <h3 class="text-center"><b>Por Categoria de Essências</b></h3>
            <carousel :items-to-show="4" :wrap-around="true">
              <slide id="carouselCat" v-for="category in filteredEssences" :key="category.id" class="col d-flex mx-2" style="flex-direction: column;" @click="loadProductsByCategory(category.id)">
                <div class="carousel__item" type="button">
                  <div class="img">
                    <img :src="`upload_images/categories/${category.image}`" style="width: 80px;">
                  </div>
                  <div class="name">{{ category.name }}</div>
                </div>
              </slide>
            </carousel>
          </div>
        </div>

        <div id="categoryAcessorios" class="container mt-3" style="background: #2738490a;padding: 20px;border-radius: 20px;">
          <div class="row" style="padding: 0;margin: 0;">
            <h3 class="text-center"><b>Carvões & Acessórios</b></h3>
        
              <div id="carouselCat" v-for="category in filteredCategories" :key="category.id" class="col d-flex" style="flex-direction: column;" @click="loadProductsByCategory(category.id)">
                <div class="carousel__item" type="button" style="display: flex;flex-direction: column;align-items: center;">
                  <div class="img">
                    <img :src="`upload_images/categories/${category.image}`" style="width: 80px;">
                  </div>
                  <div class="name">{{ category.name }}</div>
                </div>
              </div>
          </div>
        </div>

        <div class="card mt-3" ref="productSection" style="border: none;" v-if="essencesProducts && essencesProducts.length > 0">
          <div class="row justify-content-center">
            <div v-for="product in essencesProducts" :key="product.id" class="col-6 mx-1 my-1 d-flex align-items-stretch" style="width:46%;">
              <div class="card mb-2" style="border: 1px solid #2738491f; border-radius: 21px; background-color: #29282803; height: 100%;">
                <div class="card-body d-flex flex-column justify-content-between">
                  <h5 class="card-title" style="text-wrap: balance;font-size: 14px;"><b>{{ product.title }}</b></h5>
                  <span class="card-text"><small class="bolder"><b>{{ product.weight }}</b></small></span>

                  <div class="d-flex justify-content-center my-1">
                    <img class="items-card pulsating" alt="Logo" :src="`/upload_images/products/${product.image}`" @click="expandImage(`/upload_images/products/${product.image}`)" />
                  </div>

                  <div class="mt-1">
                    <button type="button" class="price btn position-relative">
                      R$ {{ product.value }}
                    </button>
                    <button type="button" class="mt-2 price btn position-relative" @click="addToCartWithShake(product)">
                      <i class="fa-solid fa-cart-shopping"></i> Adicionar
                    </button>
                  </div>
                  
                  <p class="card-text"><small class="bolder">{{ product.additional }}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="card card-body" style="border: none;">
            <div class="row" style="padding: 0;">


            </div>
        </div> -->

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
    essencesProducts: [],
    categories: [],
    tags: [],
    products: [],
    isModalOpen: false,
    modalImageSrc: '',
    cart: [],
    totalPrice: 0,
    isCartModalOpen: false,
    items: [
      { id: 1, image: '/categorias/Restaurantes3_42lO.avif', name: '1' },
      { id: 2, image: '/categorias/Restaurantes3_42lO.avif', name: '2' },
      { id: 3, image: '/categorias/Restaurantes3_42lO.avif', name: '3' },
      { id: 4, image: '/categorias/Restaurantes3_42lO.avif', name: '4' },
      { id: 5, image: '/categorias/Restaurantes3_42lO.avif', name: '5' },
    ],
      activeIndex: -1, // Começa sem nenhum ativo
    }
  },
  computed: {
    filteredEssences() {
      const allowedCategories = ['Nay', 'FM', 'Ziggy', 'Zomo', 'Sense', 'Magic', 'Onix'];
      return this.categories.filter(category => allowedCategories.includes(category.name));
    },
    filteredCategories() {
      const allowedCategories = ['Carvão', 'Acessórios', 'Pods'];
      return this.categories.filter(category => allowedCategories.includes(category.name));
    }
  },
  async mounted() {

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
    async loadProductsByCategory(idCategory) {
     
      try {
        const categoryIdEssences = idCategory;

        const response = await axios.get('/api/products', {
          params: {
            categoryId: categoryIdEssences,
          },
        });

        const section = this.$refs.productSection;
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        console.log("this.essencesProducts", this.essencesProducts);
        this.essencesProducts = response.data.products;
      } catch (error) {
        console.error('Erro ao carregar produtos de Essências:', error);
      }
    },
    setActive(index) {
      this.activeIndex = index;
    },
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
        console.log("CAT", this.categories = response.data);
      },
      async getTags() {
        const response = await axios.get(`/api/tags?idCategory=${this.idCategory}`)
        console.log("Response Tag", response);
        return response.data
      },
      async toggleTag(tag) {

        this.products = await this.getProducts(tag.id)
        console.log("Products", this.products);
      },
      async getProducts(tagId) {

        console.log("tag", tagId);

          //axios.get(`/api/tags?idCategory=${this.idCategory}`)

        var url = `/api/products?promotion=false`

        if (tagId) {
            url = url + `&tagId=${tagId}`
        }

        const response = await axios.get(url);

        //console.log("response", response.data.products);
        return response.data.products;


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
