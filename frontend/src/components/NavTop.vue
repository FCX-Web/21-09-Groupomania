<template>
<div>
    <b-list-group-item class="aside-top__group--margin">
        <div class="aside-top__nav">
            <b-avatar v-if="$store.state.userId == userId" class="mr-3 aside-top__widget--bguser" text="">
                <slot name="classification"></slot>
            </b-avatar>
            <b-avatar v-else class="mr-3 aside-top__widget--bgcolor" text="">
                <slot name="classification"></slot>
            </b-avatar>
            <span class="mr-auto">
                <slot name="firstName">{{ status }}</slot>
                <slot name="lastName"></slot>
            </span>
            <b-badge class="aside-top__badge--bgcolor">
                <slot name="likes"></slot>
            </b-badge>
        </div>
    </b-list-group-item>
</div>
</template>

<script>
export default {
    name: "NavTop",
    props: ["userId"]
}
</script>

<style lang="scss" scoped>
.aside-top {

    &__nav {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        background-color: #d9d9d9;
        padding: 5px 10px;
    }

    &__group--margin {
        margin: 10px;
    }

    &__widget--bgcolor {
        background-color: #80bdff;
    }

    &__widget--bguser {
        background-color: #33ff33;
        font-weight: bold;
    }

    &__widget--bgsuccess {
        background-color: #28a745;
    }

    &__badge--bgcolor {
        background-color: #007bff;
    }
}
</style>
