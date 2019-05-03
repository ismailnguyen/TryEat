<template>
    <div class="ui centered card">
        <div class="content">
            <div class="header">
                {{ restaurant.name }}
            </div>
            <div class="meta">
                <a :href="'https://www.google.com/maps/search/?api=1&query=' + restaurant.location" target="_blank">
                    {{restaurant.location}}
                </a>
            </div>
            <div class="description">
                {{ restaurant.description }}
            </div>
        </div>
        <div class="extra content">
            <span class="left floated like" @click="edit">
                <i class="edit icon"></i>
                Edit
            </span>
            <span class="right floated star" @click="remove">
                <i class="x icon"></i>
                Delete
            </span>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    const firebase = require('../firebaseConfig.js')

    export default {
        props: ['restaurant'],
        data() {
            return {
                editMode: false
            }
        },
        computed: {
            ...mapState(['userProfile', 'restaurants'])
        },
        methods: {
            remove: function () {
                firebase.restaurantsCollection
                .doc(this.restaurant.id)
                .delete()
                .catch(error => {
                    console.log(error)
                })
            },

            edit: function() {
                this.editMode = !this.editMode
            }
        }
    }
</script>
