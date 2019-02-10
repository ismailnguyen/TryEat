<template>
    <div>
        <h1 class="ui header">
            Try Eat
        </h1>

        <div class="ui stackable cards" v-if="restaurants.length">
            <RestaurantItem v-for="(restaurant, index) in restaurants" v-bind:key="index" :restaurant="restaurant" />
        </div>
        <div class="container py-5" v-else>
            <p>There are currently no restaurants</p>
        </div>
        
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
        }
    }
</script>
