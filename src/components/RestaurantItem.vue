<template>
    <div class="ui card">

        <div class="content" v-show="editMode">
            <form class="ui form">
                <div class="field">
                    <label class="left floated">Name</label>
                    <input placeholder="Name" type="text" v-model="restaurant.name" @change="update()">
                </div>
                <div class="field">
                    <label class="left floated">Location</label>
                    <input placeholder="Location" type="text" v-model="restaurant.address" @change="update()">
                </div>
                <div class="field">
                    <label class="left floated">Tags</label>
                    <textarea placeholder="Description" v-model="restaurant.tags" @change="update()"></textarea>
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
                <a :href="'https://www.google.com/maps/search/?api=1&query=' + restaurant.name + ' ' + restaurant.address" target="_blank">
                    {{restaurant.address}}
                </a>
            </div>
        </div>
        <div class="extra content" v-show="!editMode">
            <a v-for="(tag, index) in restaurant.tags.split(',')" :key="index" class="ui label">
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

                this.editMode = false;
            },

            edit: function() {
                this.editMode = !this.editMode
            },

            update: function () {
                fetch(
                    `https://nominatim.openstreetmap.org/search?&format=json&limit=1&namedetails=1&q=${ this.restaurant.location }`, 
                    {
                        mode: 'no-cors',
                        cache: 'force-cache',
                        referrer: window.location.origin,
                        referrerPolicy: 'origin-when-cross-origin',
                        headers: new Headers({
                            "Accept"       : "application/json",
                            "Content-Type" : "application/json",
                            "User-Agent"   : "Bon.app v.1.0.0 contact admin@bon.app"
                        }),
                    }
                    )
                    .then(response => response.json())
                    .then(json => {
                        if (json.length) {
                            console.log(json[0]);
                            var latitude = parseFloat(json[0].lat);  
                            var longitude = parseFloat(json[0].lon);
                            
                            this.restaurant.latitude = latitude;
                            this.restaurant.longitude = longitude;
                        }
                    })
                    .finally(this.save())
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

    .extra.content span {
        cursor: pointer;
    }
</style>