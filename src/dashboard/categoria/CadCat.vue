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

        <h2 class="mb-5" style="text-align: center;">Cadastro de Categorias</h2>
        
        <div class="container">
            <div class="row">

                <div class="col-9">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 style="color:#212529 !important;"><b>Dados da Categoria</b></h6>
                                </div>
                                <div class="col-12 mt-4">
                                    <div class="form-group">
                                        <label for="fullName" class="text-primary"><b>Nome da Categoria</b></label>
                                        <input v-model="form.name" type="text" class="form-control" id="nomeImte" placeholder="Digite nome da Categoria">
                                    </div>
                                </div>
                                
                            </div>
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 class="mt-5 text-primary">Imagem da Categoria</h6>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="formFile" class="form-label"><small>Selecione a imagem do produto</small></label>
                                        <p v-show="loaded"><b>ARQUIVO CARREGADO</b></p>
                                        <input @change="onFileUpload()" type="file" id="formFile" accept=".jpg, .png, .gif, .webp, .jpeg">
                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="mt-5 mb-5 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div>
                                        <button @click.prevent="addUpdateCategory" type="button" id="submit" name="submit" class="btn" style="background: #0b9712;color: white;border: none;">
                                            {{ mode === 'ADD' ? 'Cadastrar' : 'Atualizar' }}
                                        </button>
                                           <button @click.prevent="$router.push('/listcat')" type="button" id="submit" name="submit" class="mx-3 btn btn-danger">Voltar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-3">
                    <div class="card h-100">
                        <div class="card-body" style="align-items: center;justify-content: center;">
                            <div class="account-settings">
                                <div class="user-profile">
                                    <p><b>Prévia da Edição</b></p>
                                    <div v-if="mode == 'ADD' " class="user-avatar">
                                        <img id="img1" v-if="!form.image" src="/logo.png" style="width: 180px;height: 100px;">
                                        <img id="img2" v-else :src="form.image">
                                    </div>
                                    <div v-else>
                                        <img id="img3" v-if="imageUpdated == false " style="width: 150px;" :src="'/upload_images/categories/' + form.image">
                                        <img id="img4" v-else style="width: 150px;" :src="form.image">
                                    </div>
                                        <h5 class="user-name">Categoria: {{ form.name }}</h5>
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

import MenuLateral from '../components/MenuLateral.vue';
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                name: '',
                image: '',
                tags: []
            },
            idCategory: '',
            mode: 'ADD',
            loaded: false,
            imageUpdated: ''
        }
    },
    components: {
        MenuLateral,
    },
    async mounted() {
        this.idCategory = this.$route.query.id

        if (this.idCategory) {
            this.mode = 'UPDATE'

            await this.getCategory(this.idCategory)

            console.log(this.form)
        }
        console.log("FormIMG",this.form.image);

    },
    methods: {
        async addUpdateCategory() {
            if (this.mode === 'ADD') {
                await axios.post("/api/category", this.form)
                alert('Categoria cadastrada com sucesso!')
            } else {
                await axios.put(`/api/category/${this.idCategory}`, this.form)


                alert('Categoria alterada com sucesso!')
            }

            this.$router.push('/listcat')
        },
        async getCategory(idCategory) {
            const response = await axios.get(`/api/categories?id=${idCategory}`)
            
            this.form = response.data
        },
        onFileUpload() {
            const file = document.querySelector('input[type=file]').files[0];
            const reader = new FileReader();
            this.loaded = false;
                      
            if (this.mode == 'UPDATE') {
                this.imageUpdated = true;
                console.log("UDPDATE", this.imageUpdated);
            }

            reader.onloadend = () => {
                this.form.image = reader.result;
                this.loaded = true;
            }

            reader.readAsDataURL(file);
        }
    },
}
</script>

<style>

section#main_prod{ 
    margin-left: 250px;
    
}

.account-settings .user-profile {
    margin: 0 0 1rem 0;
    padding-bottom: 1rem;
    text-align: center;
}
.account-settings .user-profile .user-avatar {
    margin: 0 0 1rem 0;
}
.account-settings .user-profile .user-avatar img {
    width: 200px;
    height: 200px;
    border-radius: 10px;
}
.account-settings .user-profile h5.user-name {
    margin: 0 0 0.5rem 0;
}
.account-settings .user-profile h6.user-email {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 400;
    color: #9fa8b9;
}
.account-settings .about {
    margin: 2rem 0 0 0;
    text-align: center;
}
.account-settings .about h5 {
    margin: 0 0 15px 0;
    color: #007ae1;
}
.account-settings .about p {
    font-size: 0.825rem;
}
.form-control {
    border: 1px solid #cfd1d8;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: 1.2rem;
    background: #ffffff;
    color: #2e323c;
}

</style>