<template>
    <div>
        <h1 class="ui header">
            Map
        </h1>

        <div id="map"></div>

        <section>
            <div class="ui middle aligned cards" v-if="restaurants.length">
                <RestaurantItem v-for="(restaurant, index) in restaurants" v-bind:key="index" :restaurant="restaurant" />
            </div>
            <div class="container py-5" v-else>
                <p>There are currently no restaurants</p>
            </div>
        </section>

    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import RestaurantItem from '../components/RestaurantItem.vue'

    export default {
        components: {
            RestaurantItem
        },
        computed: {
            ...mapState(['userProfile', 'restaurants'])
        },
        mounted() {
            var map;
            function initMap() {
                map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
                });
            }
        }
    }
</script>

<style scoped>
    #map {
        height: 100%;
    }
</style>