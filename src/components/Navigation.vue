<template>
    <footer>
        <div class="ui four item menu">
            <router-link class="item" to="dashboard" active-class="active">
                <i class="big home icon"></i>
            </router-link>
            <router-link class="item" to="map" active-class="active">
                <i class="big map icon"></i>
            </router-link>
            <router-link class="item" to="add-restaurant" active-class="active">
                <i class="big plus icon"></i>
            </router-link>
            <router-link class="item" to="settings" active-class="active">
                <i class="big cog icon"></i>
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
        bottom: 0;
        width: 100%;
    }
</style>