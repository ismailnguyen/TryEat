<template>
    <div class="ui container">
        <Header />
        
        <div class="ui top attached search-bar" v-if="restaurants.length">
            <div class="ui big fluid icon input">
                <input type="search" :value="searchQuery" @input="updateSearchQuery" placeholder="Search ..." autofocus>
                <i class="search icon"></i>
            </div>
        </div>

        <div class="ui grid" v-if="filteredRestaurants.length">
            <div class="sixteen wide column">
                <div class="ui three stackable cards restaurants-list">
                    <RestaurantItem v-for="(restaurant, index) in filteredRestaurants" v-bind:key="index" :restaurant="restaurant" />
                </div>
            </div>
        </div>

        <div class="container py-5 no-content" v-else>
            <h2>No restaurant found</h2>
            <h3>Click on + button on top right corner to add a restaurant !</h3>
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
                title: 'Try Eat',
                searchQuery: ''
            }
        },
        components: {
            Header,
            RestaurantItem
        },
        methods: {
            updateSearchQuery: function (event)
            {
                this.searchQuery = event.target.value;
            }
        },
        mounted() {
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();

                $(".search-bar").css({
                    "top": scroll ? '12px' : '73px'
                });
            });
        },
        computed: {
            ...mapState(['userProfile', 'restaurants']),

            filteredRestaurants: function () {
                if (this.searchQuery == '') {
                    return this.restaurants;
                }

                let query = this.searchQuery.toLowerCase();

                return this.restaurants.filter(restaurant => {
                    return restaurant.name.toLowerCase().includes(query)
                            || restaurant.address.toLowerCase().includes(query)
                            || restaurant.tags.toLowerCase().includes(query);
                });
            }
        }
    }
</script>

<style scoped>
    .search-bar {
        position: fixed;
        top: 73px;
        width: 60%;
        z-index: 9999;
        margin: auto;
        right: 0;
        left: 0;
        transition: all .5s;
        backdrop-filter: blur(10px);
    }

    .search-bar input,
    .search-bar input:active,
    .search-bar input:focus {
        background: rgba(41, 46, 79, 0.63);
    }

    .restaurants-list, .no-content {
        text-align: center;
        margin-top: 85px;
    }
</style>