<template>
    <div class="ui card">

        <div class="content" v-show="editMode">
            <form class="ui form">
                <div class="field">
                    <label>Name</label>
                    <input placeholder="Name" type="text"v-model="restaurant.name" @change="save()">
                </div>
                <div class="field">
                    <label>Location</label>
                    <input placeholder="Location" type="text" v-model="restaurant.location" @change="save()">
                </div>
                <div class="field">
                    <label>Description</label>
                    <textarea placeholder="Description" v-model="restaurant.description" @change="save()"></textarea>
                </div>
            </form>
        </div>
        <div class="extra content" v-show="editMode">
            <span class="left floated" @click="remove">
                <i class="trash icon"></i>
                Delete
            </span>

            <span class="right floated" @click="edit">
                <i class="x icon"></i>
                Close
            </span>
        </div>

        <div class="content" v-show="!editMode">
            <div class="header">
                {{ restaurant.name }}
            </div>
            <div class="meta">
                <a :href="'https://www.google.com/maps/search/?api=1&query=' + restaurant.location" target="_blank">
                    {{restaurant.location}}
                </a>
            </div>
        </div>
        <div class="extra content" v-show="!editMode">
            <a v-for="(tag, index) in restaurant.description.split(',')" class="ui label">
                {{tag}}
            </a>

            <span class="right floated" @click="edit">
                <i class="edit icon"></i>
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
            ...mapState(['currentUser', 'userProfile', 'restaurants'])
        },
        methods: {
            remove: function () {
                firebase.usersCollection
                .doc(this.currentUser.uid)
                .collection('restaurants')
                .doc(this.restaurant.id)
                .delete()
                .catch(console.log)
            },

            edit: function() {
                this.editMode = !this.editMode
            },

            save: function () {
                firebase.usersCollection
                .doc(this.currentUser.uid)
                .collection('restaurants')
                .doc(this.restaurant.id)
                .update(this.restaurant)
                .catch(console.log)
            }
        }
    }
</script>

<style scoped>
    .ui.form .field>label {
        color: #000;
    }

    .ui.card {
        margin-bottom: 25px !important; 
        box-shadow: 8px 8px 0px #aaa;
    }
</style>