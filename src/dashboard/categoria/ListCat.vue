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
                <img alt="Logo" src="/logo.png" class="text-center" style="width:200px" />
            </div>
    
            <h2 class="mb-5" style="text-align: center;">Lista de Categorias</h2>
            
            <div class="container col-12" style="justify-content: center;">

                <div class="main-box no-header clearfix">

                  
                    <div class="main-box-body clearfix shadow-lg" style="border-radius:8px">

                        <div class="table-responsive">

                            <table class="table user-list ">

                                <thead>
                                    <tr>
                                        <th><span>Imagem</span></th>
                                        <th><span>Nome da Categoria</span></th>
                                        <th><span>Ação</span></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="category in categories">
                                        <td>
                                            <img style="width:100px;height: 100px;" :src="'/upload_images/categories/' + category.image">
                                        </td>

                                        <td><span>{{ category.name }}</span></td>
                                        
                                        
                                        <td>
                                            <a href="#" class="table-link text-info">
                                                <span class="fa-stack">
                                                    <i class="fa fa-square fa-stack-2x"></i>
                                                    <i @click="$router.push(`/cadcat?id=${category.id}`)" class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                                </span>
                                            </a>
                                            <a href="#" class="table-link text-warning" @click="confirmDelete(category.id, category.name)">
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
              
    
        </section>
    
    </body>
    
    
</template>
<script>
    
import MenuLateral from '../components/MenuLateral.vue';
import axios from 'axios';

export default {
    data() {
        return {
            categories: []
        }
    },
    components: {
        MenuLateral,
    },
    async mounted() {
        this.categories = await this.getCategories();
    },
    methods: {
        async getCategories() {
            const response = await axios.get('/api/categories')

            return response.data
        },
        async confirmDelete(categoryId, categoryName) {
            if (confirm(`Tem certeza que deseja deletar a categoria '${categoryName}'?`)) {
            this.deleteCategory(categoryId);
            }
        },
        async deleteCategory(categoryId) {
            try {
                const response = await axios.delete(`/api/category/${categoryId}`);
                console.log('Product deleted:', response);
                // You may want to update your UI or re-fetch the product list here
                this.categories = await this.getCategories();

            } catch (error) {
                console.error('Error deleting product:', error);
                // Handle error, show message, etc.
            }
        },
        editTag(categoryId) {
            this.$router.push(`/cadcat?id=${categoryId}`);
        }
    },

}
</script>
    
<style>

section#main_prod{ 
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