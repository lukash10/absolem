<template>

    <div v-if="cart.length > 0">

        <h2>Carrinho</h2>

        <ul>
            <li v-for="(product, index) in cart" :key="index">
                {{ product.title }} - R$ {{ product.value }}
            </li>
        </ul>

        <p><b>Total: R$ {{ totalPrice }}</b></p>
       
        <div style="position: absolute;bottom: 20px;">
            <div>
                <button type="button" class="btn btn-primary" @click="sendCartItemsToWhatsApp">
                    <i class="fa-brands fa-whatsapp"></i><b> Enviar pedido para o WhatsApp</b>
                </button>
            </div>

            <div class="mt-3">
                <button class="btn btn-danger" @click="clearCart">Limpar Carrinho</button>
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
        clearCart() {
        // Limpar carrinho
            this.$emit('clear-cart');
        },
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
            const phoneNumber = "5566974001680";

            // Formate o link para enviar a mensagem pelo WhatsApp
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            // Abra uma nova janela para enviar a mensagem pelo WhatsApp
            window.open(whatsappLink, "_blank");
        }
    }
};
</script>
  