<template>
    <footer>
        <div class="ui two item menu">
            <router-link class="item" to="dashboard" active-class="active">
                <i class="big bookmark icon" v-if="this.$route.name === 'Dashboard'"></i>
                <i class="big bookmark outline icon" v-else></i>
            </router-link>
            <router-link class="item" to="map" active-class="active">
                <i class="big map icon" v-if="this.$route.name === 'Map'"></i>
                <i class="big map outline icon" v-else></i>
            </router-link>
        </div>
    </footer>
</template>

<script>
    export default {
        mounted () {
            var lastScrollTop = 0;

            $(window).scroll(function(event) {
                var st = $(this).scrollTop();

                var isScrollDown = st > lastScrollTop;

                $('footer').css({
                    'display': isScrollDown ? 'none': 'block'
                });

                lastScrollTop = st;
            });
        }
    }
</script>

<style scoped>
    footer {
        position: fixed;
        right: 50px;
        left: 50px;
        bottom: 20px;
        z-index: 1030;
        backdrop-filter: blur(10px);
        width: 42.5vh;
        margin: auto;
    }
    
    .ui.menu {
        background: #292e4fa1;
        color: #ffffff;
        border-radius: 10px;
        border: none;
    }

    .ui.menu .item {
        color: #ffffff;
    }
    
    .ui.menu .active.item,
    .ui.menu .active.item:hover {
        background: #292e4fcf;
        color: #eb4b8a;
        margin: 10px;
        border-radius: 10px;
    }
</style>