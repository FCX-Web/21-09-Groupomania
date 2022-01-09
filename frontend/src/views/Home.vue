<template>
<div id="userspace">
    <nav>
        <Nav />
    </nav>
    <section>
        <Section />
    </section>
</div>
</template>

<script>
import Nav from '../components/Nav.vue'
import Section from '../components/Section.vue'
export default {
    name: 'Home',
    components: {
        Nav,
        Section,
    }
}
</script>

<style lang="scss">
#userspace {
    background-color: #d9d9d9;
}

nav {
    margin: 0 10px 20px 5px;
    padding-top: 10px;
}

section {
    margin: 0 20px 20px;
    overflow: auto;
    padding-bottom: 10px;
}
</style>
