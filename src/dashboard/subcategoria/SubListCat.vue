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
    
            <h2 class="mb-5" style="text-align: center;">Lista de Sub Categorias</h2>
            
            <div class="container col-12" style="justify-content: center;">

                <div class="main-box no-header clearfix">

                  
                    <div class="main-box-body clearfix shadow-lg" style="border-radius:8px">

                        <div class="table-responsive">

                            <table class="table user-list ">

                                <thead>
                                    <tr>
                                        <th><span>Nome da SubCategoria</span></th>
                                       
                                        <th><span>Ação</span></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="tag in tags">
                                       
                                        <td><span>{{ tag.name }}</span></td>
                                         
                                        <td>
                                            <a href="#" class="table-link text-info">
                                                <span class="fa-stack">
                                                    <i class="fa fa-square fa-stack-2x"></i>
                                                    <i @click="editTag(tag.id)" class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                                </span>
                                            </a>
                                            <a href="#" class="table-link text-warning" @click="confirmDelete(tag.id, tag.name)">
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
            tags: []
        }
    },
    components: {
        MenuLateral,
    },
    async mounted() {
        
        this.tags = await this.getTags();
        console.log(this.tags);

    },
    methods: {
        async confirmDelete(subcategoryId, subcategoryName) {
            if (confirm(`Tem certeza que deseja deletar a subcategoria '${subcategoryName}'?`)) {
            this.deleteCategory(subcategoryId);
            }
        },
        async deleteCategory(subcategoryId) {
            try {
                const response = await axios.delete(`/api/tag/${subcategoryId}`);
                console.log('Product deleted:', response);
                // You may want to update your UI or re-fetch the product list here
                this.tags = await this.getTags();

            } catch (error) {
                console.error('Error deleting product:', error);
                // Handle error, show message, etc.
            }
        },
        async getTags() {
            const response = await axios.get('/api/tags')

            return response.data
        },
        editTag(tagId) {
            this.$router.push(`/subcadcat?id=${tagId}`);
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