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
    
            <h2 class="mb-5" style="text-align: center;">{{ mode === 'ADD' ? 'Cadastro de SubCategorias' : 'Alterar SubCategoria' }}</h2>
            
            <div class="container">
                <div class="row">
    
                    <div class="col-12">
                        <div class="card h-100">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 class="text-primary">Dados da Categoria</h6>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="fullName">Nome da Sub-Categoria</label>
                                            <input v-model="form.name" type="text" class="form-control" id="nomeImte" placeholder="Exemplo: Lata |Garrafa...">
                                        </div>
                                    </div>
    
                                    <div class="mt-3 mb-3 col-12">
                                        Selecione a Categoria principal a ser vinculada à Subcategoria. (Se a Subcategoria for Lata, a Categoria principal pode ser: Bebidas Não Alcóolicas ou Bebidas Alcóolicas).
                                        <Multiselect
                                            v-model="categoriesSelected"
                                            mode="tags"
                                            :close-on-select="false"
                                            :options="options"
                                        />
                                    </div>
                                    
                                </div>
    
                                <div class="row">
                                    <div class="mt-5 mb-5 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div>
                                            <button type="button" @click.prevent="addTag" id="submit" name="submit" class="btn" style="background: #b01116;color: white;border: none;">
                                               {{ mode === 'ADD' ? 'Cadastrar' : 'Atualizar' }}
                                            </button>
                                            <button type="button" id="submit" name="submit" @click.prevent="$router.push('/sublistcat')" class="mx-3 btn btn-secondary">Voltar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
                
            </div>      
    
        </section>
    
    </body>
    
    
</template>
    
<script>

    import Multiselect from '@vueform/multiselect'
    import MenuLateral from '../components/MenuLateral.vue';
    import axios from 'axios';

    export default {
        data() {
            return {
                form: {
                    name: '',
                    categories: []
                },
                idTag: '',
                value: [],
                options: [],
                mode: 'ADD',
                categoriesSelected: []
            }
        },
        components: {
            MenuLateral,
            Multiselect
        },
        async mounted() {
            this.idTag = this.$route.query.id;
            if (this.idTag) {
                this.mode = 'UPDATE'
                this.form = await this.getTag(this.idTag);
            }
            const categories = await this.getCategories()
            this.options = categories.map((c) => { return { value: c, label: c.name } })
            this.categoriesSelected = this.form.categories
        },
        methods: {
            async addTag() {
                this.form.categories = this.categoriesSelected
                if (this.mode === 'ADD') {
                    await axios.post("/api/tag", this.form);
                    alert('SubCategoria cadastrada com sucesso!')
                } else {
                    await axios.put(`/api/tag/${this.idTag}`, this.form)
                    alert('SubCategoria alterada com sucesso!')
                }
                this.$router.push('/sublistcat')
            },
            async getTag(idTag) {
                const response = await axios.get(`/api/tags?id=${idTag}`);
                
                return response.data;
            },
            async getCategories() {
                const response = await axios.get(`/api/categories`);
                
                return response.data;
            }
        },
    }
    
</script>
    
<style>

section#main_prod{ 
    margin-left: 250px;
        
    }

</style>