<template>
<div id="footer-section">
    <a class="footer-item" href="#">Mentions légales</a>
    <a class="footer-item" href="#">Conditions générales</a>
    <a class="footer-item" href="#">Plan du site</a>
    <a class="footer-item" href="#">Charte de confidentialité</a>
    <a class="footer-item" href="#">Accessibilité</a>
    <a class="footer-item" href="#">Nous contacter</a>
</div>
</template>

<script>
export default {
    name: 'Footer',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#footer-section {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.footer-item {
    color: #808080;
    text-decoration: none;
}

@media screen and (max-width: 889px) {
    #footer-section {
        flex-direction: column;
        justify-content: center;
    }
}
</style>
