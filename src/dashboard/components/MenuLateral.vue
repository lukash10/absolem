<template>

    <section id="menu" class="background-ab">

        <ul class="nav nav-pills flex-column mb-auto p-3">
            
            <li class="nav-item nav-link active" style="text-align: center;">
                <i class="fa-solid fa-house"></i>
                <router-link class="rlink" to="/dashboard">Página Inicial</router-link>
            </li>

            <hr style="color:white">
            
                <h4 style="text-align: center;color:white">Categorias</h4>

                <router-link class="rlink" to="/cadcat"><li class="lks nav-item nav-link">
                    <i class="fa-solid fa-square-plus lkss"></i>
                    Cadastrar Categoria
                </li></router-link>
            
                <router-link class="rlink" to="/listcat"><li class="lks nav-item nav-link">
                    <i class="fa-solid fa-list lkss"></i>
                    Listar Categorias
                </li></router-link>

                <hr style="color:white">
            
            <h4 style="text-align: center;color:white">Sub Categorias</h4>

            <router-link class="rlink" to="/subcadcat"><li class="lks nav-item nav-link">
                <i class="fa-solid fa-square-plus lkss"></i>
                Cad SubCategoria
            </li></router-link>
        
            <router-link class="rlink" to="/sublistcat"><li class="lks nav-item nav-link">
                <i class="fa-solid fa-list lkss"></i>
                Listar SubCategoria
            </li></router-link>

            <hr style="color:white">

                <h4 style="text-align: center;color:white">Produtos</h4>
            
                <router-link class="rlink" to="/cadproduto"><li class="lks nav-item nav-link">
                    <i class="fa-solid fa-square-plus lkss"></i>
                    Cadastros Produtos
                </li></router-link>

                <router-link class="rlink" to="/listproduto"><li class="lks nav-item nav-link">
                    <i class="fa-solid fa-list lkss"></i>
                    Listar Produtos
                </li></router-link>
            
        </ul>

    </section>


</template>

<style scoped>

.nav-link{
    color:white;
}

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
    padding: 5px;
    color: white;
    font-size: 16px;
    text-decoration: none !important;
}

.lks{
    background-color: #2d343b;
    margin-bottom: 10px;
    text-decoration: none !important;
}

.lks:hover{
    background: black;
}

.lkss{
    color: white;
}





</style>