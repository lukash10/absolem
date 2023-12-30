<template>

    <section id="menu">

        <ul class="nav nav-pills flex-column mb-auto p-3">
            
            <li class="nav-item nav-link active" style="text-align: center;">
                <i class="fa-solid fa-house"></i>
                <router-link class="rlink" to="/dashboard">Página Inicial</router-link>
            </li>

            <hr style="color:white">
            
                <h4 style="text-align: center;color:white">Categorias</h4>

                <li class="lks nav-item nav-link">
                    <i class="fa-solid fa-square-plus lkss"></i>
                    <router-link class="rlink" to="/cadcat">Cadastrar Categoria</router-link>
                </li>
            
                <li class="lks nav-item nav-link">
                    <i class="fa-solid fa-list lkss"></i>
                    <router-link class="rlink" to="/listcat">Listar Categorias</router-link>
                </li>

                <hr style="color:white">
            
            <h4 style="text-align: center;color:white">Sub Categorias</h4>

            <li class="lks nav-item nav-link">
                <i class="fa-solid fa-square-plus lkss"></i>
                <router-link class="rlink" to="/subcadcat">Cad SubCategoria</router-link>
            </li>
        
            <li class="lks nav-item nav-link">
                <i class="fa-solid fa-list lkss"></i>
                <router-link class="rlink" to="/sublistcat">Listar SubCategoria</router-link>
            </li>

            <hr style="color:white">

                <h4 style="text-align: center;color:white">Produtos</h4>
            
                <li class="lks nav-item nav-link">
                    <i class="fa-solid fa-square-plus lkss"></i>
                    <router-link class="rlink" to="/cadproduto">Cadastros Produtos</router-link>
                </li>

                <li class="lks nav-item nav-link">
                    <i class="fa-solid fa-list lkss"></i>
                    <router-link class="rlink" to="/listproduto">Listar Produtos</router-link>
                </li>
            
        </ul>

    </section>


</template>

<style scoped>

section#menu{
    width: 250px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin-top:80px;
    background-color: #212529;
}

section#main{ 
    margin-left: 250px;
    
}

.rlink{
    padding:10px;
    color: white;
    font-size: large;
}

.lks{
    background-color: #2d343b;
    margin-bottom: 10px;
}

.lkss{
    color: white;
}





</style>