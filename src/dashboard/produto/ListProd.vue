<template>

    <body>
    
        <div id="top-nav" class="justify-content-center navbar navbar-static-top mb-5" style="height: 80px;background-color: #212529;">
            <div class="d-flex px-3">
                <img alt="Logo" src="../../assets/logo_calacio.png" class="text-center" style="width:50px" />
            </div>
            <div class="d-flex">
                <h2 style="color: white;margin-top:7px">Calácio Conveniência</h2>
            </div>
        </div>
    
        <MenuLateral></MenuLateral>
    
        <section id="main_prod">
    
            <h2 class="mb-5" style="text-align: center;">Lista de Produtos</h2>
            
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card search-form">
                            <div class="card-body">
                                <form id="search-form">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="px-2 col-lg-3 col-md-3 col-sm-12 p-0">
                                                    <select class="form-control" id="exampleFormControlSelect1">
                                                        <option>Categoria</option>
                                                        <option>London</option>
                                                        <option>Boston</option>
                                                        <option>Mumbai</option>
                                                        <option>New York</option>
                                                        <option>Toronto</option>
                                                        <option>Paris</option>
                                                    </select>
                                                </div>
                                                <div class="px-2 col-lg-8 col-md-6 col-sm-12 p-0">
                                                    <input type="text" placeholder="Buscar..." class="form-control" id="search" name="search">
                                                </div>
                                                <div class="col-lg-1 col-md-3 col-sm-12 p-0">
                                                    <button type="submit" class="btn btn-base">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
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
    
export default {
    data() {
        return {
            products: [],
            options: [],
            categories: [],
        }
    },
    components: {
        MenuLateral,
    },
    async mounted() {
        this.products = await this.getProducts();
    },
    methods: {
        async getCategoryName(categoryId) {
            try {
                //const response = await axios.get('/api/categories')
                const response = await axios.get(`/api/categories/${categoryId}`);
                console.log("RESPONOSE", response.data.categoryName);
                
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

            return products;
        }
    },

}

</script>
    
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