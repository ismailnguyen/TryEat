<template>
    <div class="ui container">
        <Header :title="title" />

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
    import Header from '../components/Header.vue'
    import RestaurantItem from '../components/RestaurantItem.vue'

    export default {
        data() {
            return {
                title: 'Try Eat'
            }
        },
        components: {
            Header,
            RestaurantItem
        },
        computed: {
            ...mapState(['userProfile', 'restaurants'])
        }
    }
</script>
