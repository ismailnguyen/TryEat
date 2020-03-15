<template>
    <div class="ui container">
        <Header />
        
        <div class="ui top attached search-bar">
            <div class="ui big fluid icon input">
                <input type="search" :value="searchQuery" @input="updateSearchQuery" placeholder="Search ..." autofocus>
                <i class="search icon"></i>
            </div>
        </div>

        <div class="ui stackable cards restaurants-list" v-if="filteredRestaurants.length">
            <RestaurantItem v-for="(restaurant, index) in filteredRestaurants" v-bind:key="index" :restaurant="restaurant" />
        </div>

        <div class="container py-5 no-content" v-else>
            <h2>No restaurants found</h2>
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
                    "top": scroll ? '7px' : '73px'
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
                            || restaurant.location.toLowerCase().includes(query)
                            || restaurant.description.toLowerCase().includes(query);
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
        box-shadow: 8px 8px 0px #aaa;
        margin: auto;
        right: 0;
        left: 0;
        transition: all .5s;
    }

    .search-bar input {
        box-shadow: 8px 8px 0px #aaa;
    }

    .restaurants-list, .no-content {
        text-align: center;
        margin-top: 85px;
    }
</style>