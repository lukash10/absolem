<template>

    <div v-if="cart.length > 0">

        <h2><img src="/checklist.png" style="width:40px" class="pulsating-cart"><b> Meu Carrinho </b></h2>
        <hr>

        <ul style="list-style: none;padding-left: 0;">
            <li v-for="(product, index) in cart" :key="index" class="mt-3" style="background: #bf67f94f;border-radius: 10px;padding-top: 5px;padding-bottom: 5px;padding-left: 10px;padding-right: 10px;">
                <div class="cart-wrapper mt-2" style="display: flex;justify-content: space-between;">
                    <div>
                        <b>{{ product.title }} - R$ {{ product.value }}</b>
                    </div>
                    
                    <i class="fa-solid fa-xmark" @click="removeItem(index)"></i>
                </div>
            </li>
        </ul>

        <div class="mt-5">
            
        </div>
       
        <div style="position: absolute;bottom: 20px;">
            <div class="mt-2 mb=2">
                <b class="mx-2">Total do Pedido: <i class="fa-solid fa-cart-shopping"></i> R$ {{ totalPrice.toFixed(2) }}</b>
            </div>
            <div>
                <button type="button" class="mt-2 btn pulsating-button" style="background: #333333;border: none;color: white;" @click="sendCartItemsToWhatsApp">
                    <i class="fa-brands fa-whatsapp"></i><b> Enviar pedido para o WhatsApp</b>
                </button>
            </div>
        </div>
        

    </div>

    <div v-else>
        <p>Carrinho vazio</p>
    </div>

</template>
  
<script>
    export default {
    props: {
        cart: Array,
        totalPrice: Number
    },
    methods:{
        sendCartItemsToWhatsApp() {
            if (this.cart.length === 0) {
                // Se o carrinho estiver vazio, não envie mensagem
                alert('Seu carrinho está vazio!');
                return;
            }

            // Construa a mensagem com os detalhes dos itens do carrinho
            const itemsMessage = this.cart.map((item, index) => {
                return `${index + 1}. ${item.title} - R$ ${item.value}`;
            }).join('\n');

            const totalPriceMessage = `*Total: R$ ${this.totalPrice.toFixed(2)}*`;

            const message = `*Olá, desejo comprar os seguintes produtos:*\n\n${itemsMessage}\n\n${totalPriceMessage}`;

            // Número para o qual você quer enviar a mensagem (substitua com seu número)
            const phoneNumber = "5566992482254";

            // Formate o link para enviar a mensagem pelo WhatsApp
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            // Abra uma nova janela para enviar a mensagem pelo WhatsApp
            window.open(whatsappLink, "_blank");
        },
        removeItem(index) {
            // Remover item do carrinho pelo índice
            this.cart.splice(index, 1);
            // Emitir evento para atualizar o carrinho no componente pai
            this.$emit('update-cart', this.cart);
        }
    }
};
</script>
  
<style>

@keyframes pulse {
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.95);
  }
}

/* Classe para aplicar a animação */
.pulsating-button {
  animation: pulse 1.5s infinite;
}

</style>