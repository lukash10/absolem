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
            
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <VueMultiselect
                        v-model="selected"
                        :options="options"
                        :close-on-select="true"
                        :clear-on-select="false"
                        placeholder="Busque um produto"
                        label="name"
                        track-by="name"
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
                                                                <th class="text-center">Adicional</th>
                                                                <th>Ações</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="product in products">
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
                                                                    <p class="type m-0 text-center"> {{ product.additional }} </p>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="table-link text-info" @click="$router.push(`/cadproduto?id=${product.id}`)">
                                                                        <span class="fa-stack">
                                                                            <i class="fa fa-square fa-stack-2x"></i>
                                                                            <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                                                        </span>
                                                                    </a>
                                                                    <a href="#" class="table-link text-warning" @click="confirmDelete(product.id, product.title)">
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
                                        <li class="page-item">
                                            <a class="page-link no-border" href="#">
                                                <span aria-hidden="true">«</span>
                                                <span class="sr-only">Previous</span>
                                            </a>
                                        </li>
                                        <li class="page-item active"><a class="page-link no-border" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link no-border" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link no-border" href="#">3</a></li>
                                        <li class="page-item"><a class="page-link no-border" href="#">4</a></li>
                                        <li class="page-item">
                                            <a class="page-link no-border" href="#">
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
            products: [],
            options: [],
            categories: [],
            selected: null,
            options: ['list', 'of', 'options']
        }
    },
    components: {
        MenuLateral,
        VueMultiselect
    },
    async mounted() {
        this.products = await this.getProducts();
    },
    methods: {
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
                console.log('Product deleted:', response);
                // You may want to update your UI or re-fetch the product list here
                this.products = await this.getProducts();

            } catch (error) {
                console.error('Error deleting product:', error);
                // Handle error, show message, etc.
            }
        },
        async getProducts() {

            const response = await axios.get('/api/products');
            const products = response.data;

            for (const product of products) {
                product.categoryName = await this.getCategoryName(product.categoryId);
            }

            console.log("PRODUTOS", products);
            return products;
        }
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



</style>