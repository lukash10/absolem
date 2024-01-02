<template>

<div v-if="showInstallPrompt && isAndroid && !isPWAInstalled" class="toast-container position-absolute" style="top: 70px !important;right: 3px !important;">
    <div id="pwaToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" style="display: block;background-color: white;">
    <div class="toast-header">
        
        <strong class="me-auto">Aplicativo Absolem</strong>
        <small>Absolem Tabacaria</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" @click="closeToast"></button>
    </div>
    <div class="toast-body">
        Para uma melhor experiência, clique no botão e baixe nosso aplicativo.
        <button v-if="isAndroid" @click="installPWA" class="btn" style="background-color: #5b267f;color: white;"><i class="fa-brands fa-google-play"></i> Baixar Aplicativo</button>
    </div>
    </div>
</div>  

</template>


<script>

export default {
    data() {
        return {
            deferredPrompt: null,
            showInstallPrompt: false,
            isAndroid: /Android/.test(navigator.userAgent),
            isPWAInstalled: false,
        };
    },
    mounted(){
        //
    },  

    created() {
        // Detecta se a PWA já está instalada
        const mediaQuery = window.matchMedia('(display-mode: standalone)');

        if (mediaQuery && mediaQuery.matches) {
            console.log("Installed");
            this.isPWAInstalled = true;
        }else{
            console.log("Not Installed", this.isAndroid);
        }

        window.addEventListener('beforeinstallprompt', this.saveBeforeInstallPromptEvent);
    },
    destroyed() {
        window.removeEventListener('beforeinstallprompt', this.saveBeforeInstallPromptEvent);
    },
    methods: {
        closeToast() {
            console.log("CLICK");
            const toast = document.querySelector('#pwaToast');
            toast.style.display = 'none';
            console.log("toast",toast);
        },
        installPWA() {
            console.log("Cliquei");
            if (this.deferredPrompt) {
                this.deferredPrompt.prompt();
                this.deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Usuário aceitou a instalação da PWA');
                } else {
                    console.log('Usuário recusou a instalação da PWA');
                }
                this.deferredPrompt = null;
                });
            }
        },
        saveBeforeInstallPromptEvent(event) {
            this.deferredPrompt = event;
            console.log("this.deferredPrompt", this.deferredPrompt);
            this.showInstallPrompt = true;
        }
    },
};
</script>

<style>

.fade {
  transition: opacity 0.5s ease-in-out;
}

</style>