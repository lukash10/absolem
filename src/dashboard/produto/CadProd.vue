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

        <h2 class="mb-5" style="text-align: center;">Cadastro de Produtos</h2>
        
        <div class="container">
            <div class="row gutters">

                <div class="col-9">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 class="mb-2 text-primary">Dados do Produto</h6>
                                </div>
                                <div class="mb-2 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="fullName"><b>Nome do Produto</b></label>
                                        <input v-model="form.title" type="text" class="form-control" id="nomeImte" placeholder="Digite nome do Produto">
                                    </div>
                                </div>
                                <div class="mb-2 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="valor"><b>Valor (R$)</b></label>
                                                <input v-model="form.value" type="text" class="form-control" id="valor" placeholder="Ex: 10,99">
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="eMail">Peso do Produto</label>
                                                <input v-model="form.weight" type="text" class="form-control" id="peso" placeholder="Ex: 100g / 100ml">
                                            </div>
                                        </div>

                                    </div>
                                    
                                </div>
                                
                                <div class="mt-4 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="select1">Selecione a Categoria Principal do Produto</label>
                                        <select @change="changeTagOptions" v-model="form.categoryId" class="form-control" id="select1">
                                            <option v-for="o in options" :value="o.id">{{ o.name }}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="mt-4 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="select1">Selecione a Subcategoria (Lata/Garrafa/600ml...)</label>
                                        <select v-model="form.tagId" class="form-control" id="select1">
                                            <option v-for="o in tagOptions" :value="o.id">{{ o.name }}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="mt-4 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="select1">Promoção</label>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" v-model="form.promotion" id="checkPromo">
                                            <label class="form-check-label" for="flexCheckDefault">
                                                Produto em Promoção
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-4 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="select1">Produto Indisponível (marcar se o produto acabar)</label>
                                        <div class="form-check">
                                            <input v-model="form.disabled" class="form-check-input" type="checkbox" value="" id="checkProduct">
                                            <label class="form-check-label" for="flexCheckDefault">
                                                Produto Esgotado
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                
                            </div>
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 class="mt-5 text-primary">Imagem do Produto</h6>
                                </div>

                                <div class="mt-3 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="formFile" class="form-label">Selecione a imagem do produto</label>
                                        <input @input="onFileUpload()" class="form-control" type="file" id="formFile">
                                    </div>
                                </div>
                                <div class="mt-4 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="exampleFormControlTextarea1">Informações Adicionais (se houver)</label>
                                        <textarea v-model="form.additional" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                </div>


                            </div>
                            <div class="row">
                                <div class="mt-5 mb-5 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div>
                                        <button @click.prevent="addUpdateProduct" type="button" id="submit" name="submit" class="btn" style="background: #0b7544;color: white;border: none;">
                                            {{ mode === 'ADD' ? 'Cadastrar' : 'Atualizar'}}
                                        </button>
                                        <button @click.prevent="$router.push('/listproduto')" type="button" id="submit" name="submit" class="mx-3 btn btn-danger">Voltar</button>
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
                                    <hr>
                                    <div v-if="mode == 'ADD' " class="user-avatar">
                                        <img id="img1" v-if="!form.image" src="/logo.png" style="width: 180px;height: 100px;">
                                        <img id="img2" v-else :src="form.image">
                                    </div>
                                    <div v-else>
                                        <img id="img3" v-if="imageUpdated == false " style="width: 150px;" :src="'/upload_images/products/' + form.image">
                                        <img id="img4" v-else style="width: 150px;" :src="form.image">
                                    </div>
                                    <h5 class="user-name" style="font-size: 14px;">{{ form.title }}</h5>
                                    <h6 v-if="form.value" class="user-email">R$ {{ form.value }}</h6>
                                    <h6 v-if="form.categoryId" class="user-email"> <b>{{getCategoryNameById(form.categoryId)}}</b> </h6>
                                    <h6 v-if="form.promotion" class="user-email mt-2">Produto em Promoção</h6>
                                    <h6 v-if="form.disabled" class="user-email">Produto sem Estoque</h6>
                                </div>
                                <div class="about">
                                    <h6>Informações Adicionais</h6>
                                    <p>{{ form.additional }}</p>
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
import axios from 'axios'

export default {
    data() {
        return {
            image: null,
            imageSrc: null,
            options: [],
            tagOptions: [],
            form: {
                title: '',
                value: '',
                image: '',
                descricao: '',
                categoryId: null,
                tagId: null,
                promotion: false,
                disabled: false,
                weight: '',
                additional: ''
            },
            mode: 'ADD',
            idProduct: null,
            loaded: false,
            imageUpdated: ''
        }
    },
    components: {
        MenuLateral,
    },
    async mounted() {

    
        this.idProduct = this.$route.query.id

        if (this.idProduct) {
            this.mode = 'UPDATE'
            this.form = await this.getProduct()
            await this.changeTagOptions()
            console.log(this.mode);
        }
        this.options = await this.getCategories()
        console.log("FormIMG",this.form.image);
    },
    methods: {
        async getTags() {
            const response = await axios.get('/api/tags')

            return response.data
        },
        async addUpdateProduct() {
            if (this.mode === 'ADD') {
                await axios.post('/api/product', this.form)

                alert('Produto cadastrado com sucesso!')
            } else {
                await axios.put(`/api/product/${this.idProduct}`, this.form)

                alert('Produto atualizado com sucesso!')
            }

            this.$router.push('/listproduto')
        },
        async getProduct() {
            const response = await axios.get(`/api/products?id=${this.idProduct}`)

            return response.data
        },
        async getCategories() {
            const response = await axios.get('/api/categories')

            return response.data
        },
        getCategoryNameById(categoryId) {
            const category = this.options.find(option => option.id === categoryId);
            return category ? category.name : '';
        },
        async changeTagOptions() {
            const response = await axios.get(`/api/tags?idCategory=${this.form.categoryId}`)

            console.log(this.form)
            this.tagOptions = response.data;
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