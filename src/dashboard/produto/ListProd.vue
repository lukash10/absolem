<template>

    <body>
    
        <div id="top-nav" class="justify-content-center navbar navbar-static-top mb-5" style="height: 80px;background-color: #212529;">
            <div class="d-flex">
                <h2 style="color: white;margin-top:7px">Absolem Tabacaria & Distribuidora</h2>
            </div>
        </div>
    
        <MenuLateral></MenuLateral>
    
        <section id="main_prod">

            <div class="d-flex justify-content-center">
                <img alt="Logo" src="/logo.png" class="text-center" style="width:150px" />
            </div>
    
            <h2 class="mb-5" style="text-align: center;">Lista de Produtos</h2>
            
            <div v-if="loading" class="text-center mt-5">
                
                <div class="mt-1 mb-2 loading-pulse">
                    <b>Carregando Produtos...</b>
                </div>
 
                <div class="spinner-border text-primary mx-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-border text-secondary mx-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-border text-success mx-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>

            </div>

            <div v-else class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <VueMultiselect
                            @input="filteredProducts"
                            v-model="selected"
                            :options="options"
                            :close-on-select="true"
                            :clear-on-select="false"
                            placeholder="Busque um produto"
                        />
                    </div>
                </div>

                <div class="mt-3 row">
                    <div class="col-12">
                        <div class="card card-margin">
                            <div class="card-body">
                                <div class="row search-body">
                                    <div class="col-lg-12">
                                        <div class="search-result">
                                            <div class="result-body">
                                                <div class="table-responsive">
                                                    <table class="table widget-26">
                                                        <thead>
                                                            <tr>
                                                                <th class="text-center">Imagem</th>
                                                                <th>Nome</th>
                                                                <th>Categoria</th>
                                                                <th>Valor</th>
                                                                <th>Peso</th>
                                                                <th>Estoque</th>
                                                                <th>Ações</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(product, index) in products" :key="index">
                                                                <td>
                                                                    <div class="widget-26-job-emp-img">
                                                                        <img class="img-size" :src="'/upload_images/products/' + product.image" alt="Company" />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="widget-26-job-title">
                                                                        <p>{{ product.title }}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="widget-26-job-title">
                                                                        <p>{{ product.categoryName }}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="widget-26-job-info">
                                                                        <p class="type m-0"><b>R$ {{ product.value }}</b></p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <p class="type m-0"> {{ product.weight }}</p>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <input type="number" v-model="product.stock" min="0" class="form-control" style="width: 70px;" />
                                                                        <button class="btn btn-sm btn-success" @click="updateStock(product.id, product.stock)">
                                                                            Atualizar
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a type="button" class="table-link text-info" @click="$router.push(`/cadproduto?id=${product.id}`)">
                                                                        <span class="fa-stack">
                                                                            <i class="fa fa-square fa-stack-2x"></i>
                                                                            <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                                                        </span>
                                                                    </a>
                                                                    <a type="button" class="table-link text-warning" @click="confirmDelete(product.id, product.title)">
                                                                        <span class="fa-stack">
                                                                            <i style="color:#b01116" class="fa fa-square fa-stack-2x"></i>
                                                                            <i style="color:white" class="fa fa-trash fa-stack-1x fa-inverse" aria-hidden="true"></i>
                                                                        </span>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <nav class="d-flex justify-content-center">
                                    <ul class="pagination pagination-base pagination-boxed pagination-square mb-0">

                                        <li type="button" class="page-item" v-if="currentPage > 1">
                                            <a class="page-link no-border" @click="previousPage">
                                                <span aria-hidden="true">«</span>
                                                <span class="sr-only">Previous</span>
                                            </a>
                                        </li>

                                        <li type="button" v-for="pageNumber in totalPages" :key="pageNumber" :class="{'page-item': true, 'active': currentPage === pageNumber}">
                                            <a class="page-link no-border" @click="changePage(pageNumber)">{{ pageNumber }}</a>
                                        </li>

                                        <li type="button" class="page-item" v-if="currentPage < totalPages">
                                            <a class="page-link no-border" @click="nextPage">
                                                <span aria-hidden="true">»</span>
                                                <span class="sr-only">Next</span>
                                            </a>
                                        </li>

                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
              
    
        </section>
    
    </body>
    
    
</template>
    
<script>
    
import axios from 'axios';
import MenuLateral from '../components/MenuLateral.vue';
import VueMultiselect from 'vue-multiselect'
    
export default {
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 10,
            totalPages: 0,
            products: [],
            options: [],
            categories: [],
            selected: null,
            options: [],
            loading: true,
            filterProducts: [],
            multiselectKey: 0,
        }
    },
    components: {
        MenuLateral,
        VueMultiselect
    },
    mounted() {

        this.changePage(this.currentPage);

        this.loadFilter();

        this.loading = false;

    },
    computed: {
        filteredProducts() {
            if (!this.selected) {
                //console.log("Filtro1");
            } else {
                console.log("this.selected", this.selected);
                this.searchProductByTitle(this.selected).then(product => {
                    // Faça o que quiser com o produto retornado
                    console.log('Product found:', product);
                    
                    // Atualize a lista de produtos para conter apenas o produto filtrado
                    this.products = product;
                });
            }
        }
    },
    methods: {
        async loadFilter(){
            const filter = await axios.get(`/api/products`);
            this.filterProducts = filter.data.products;
            this.options = filter.data.products.map(product => product.title);
        },
        async searchProductByTitle(title) {
            try {
                console.log("Title", title);
                const response = await axios.get(`/api/product/${title}`);
                return response.data; // Ou ajuste conforme a estrutura da sua resposta da API
            } catch (error) {
                console.error('Error searching product by title:', error);
                throw error;
            }
        },
        async updateStock(productId, stock) {
            try {
                const response = await axios.put(`/api/product/${productId}`, { stock: stock });
                console.log('Stock updated:', response);
                // Atualize o produto diretamente na lista para refletir as alterações na interface
                const updatedProductIndex = this.products.findIndex(product => product.id === productId);
                if (updatedProductIndex !== -1) {
                    this.products[updatedProductIndex].stock = stock;
                    //this.products[updatedProductIndex].stock = ''; // Limpa o campo de entrada após a atualização
                    alert('Estoque atualizado com sucesso!');
                }
            } catch (error) {
                console.error('Error updating stock:', error);
                // Trate o erro, mostre uma mensagem, etc.
            }
        },
        async changePage(pageNumber) {

            this.currentPage = pageNumber;

            const response = await axios.get(`/api/products?page=${this.currentPage}&pageSize=${this.itemsPerPage}`);
            
            this.products = response.data.products;
                        
            this.totalPages = Math.ceil(response.data.totalCount / this.itemsPerPage);

            for (const product of this.products) {
                product.categoryName = await this.getCategoryName(product.categoryId);
            }

            this.loading = false;

        },
        async nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.changePage(this.currentPage);
            }
        },
        async previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.changePage(this.currentPage);
            }
        },
        async getCategoryName(categoryId) {
            try {
                //const response = await axios.get('/api/categories')
                const response = await axios.get(`/api/categories/${categoryId}`);
                                
                return response.data.categoryName; // Assuming categoryName is the property name containing the category name
                
            } catch (error) {
                console.error('Error fetching category:', error);
                return 'Category Not Found'; // Return a default value or handle the error as required
            }
        },
        async confirmDelete(productId, productName) {
            if (confirm(`Tem certeza que deseja deletar o produto '${productName}'?`)) {
                this.deleteCategory(productId);
            }
        },
        async deleteCategory(productId) {
            try {
                const response = await axios.delete(`/api/product/${productId}`);
                
                // You may want to update your UI or re-fetch the product list here
                this.products = await this.getProducts();

            } catch (error) {
                console.error('Error deleting product:', error);
                // Handle error, show message, etc.
            }
        },
    },

}

</script>
    
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>

section#main_prod{ 
    margin-left: 250px;
    
}
.img-size{
    width: 120px;
    height: 120px;
}

.table a.table-link.danger {
    color: #e74c3c;
}

a {
    color: #3498db;
    outline: none!important;
}


.table thead tr th {
    text-transform: uppercase;
    font-size: 0.875em;
}
.table thead tr th {
    border-bottom: 2px solid #e7ebee;
}
.table tbody tr td:first-child {
    font-size: 1.125em;
    font-weight: 300;
}
.table tbody tr td {
    font-size: 0.875em;
    vertical-align: middle;
    border-top: 1px solid #e7ebee;
    padding: 12px 8px;
}

.loading-pulse {
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(0.9);
    }
    50% {
        transform: scale(1);
    }
    100% {
        transform: scale(0.9);
    }
}


</style>