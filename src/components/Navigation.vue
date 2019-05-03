<template>
    <footer>
        <div class="ui two item menu">
            <router-link class="item" to="dashboard" active-class="active">
                <i class="big bookmark icon"></i>
            </router-link>
            <router-link class="item" to="map" active-class="active">
                <i class="big map icon"></i>
            </router-link>
        </div>
    </footer>
</template>

<script>
    export default {
    }
</script>

<style scoped>
    footer {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1030;
    }
</style>