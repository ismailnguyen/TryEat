<template>
    <div class="ui container">

        <Header />

        <div class="ui grid" >
            <div class="sixteen wide column">
                <div class="ui one stackable cards restaurants-list">
                    <div class="ui card">
                        <div class="content">
                            <div class="header">Add a restaurant</div>
                        </div>
                        
                        <div class="content">
                            <form class="ui form">
                                <div class="field">
                                    <label for="inputName" class="sr-only">Name</label>
                                    <input type="text" id="inputName" placeholder="Name" aria-describedby="nameHelp" v-model="restaurant.name" required>
                                </div>
                                <div class="field">
                                    <label for="inputLocation" class="sr-only">Location <small><i>(optional)</i></small></label>
                                    <input type="text" id="inputLocation" placeholder="eg. 15 rue Jean Jaures, 75015 Paris" aria-describedby="locationHelp" v-model="restaurant.address">
                                </div>
                                <div class="field">
                                    <label for="inputDescription" class="sr-only">Tags <small><i>(optional)</i></small></label>
                                    <textarea id="inputDescription" placeholder="Separated with comma" aria-describedby="descriptionHelp" v-model="restaurant.tags"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="extra content">
                            <span class="left floated" @click="cancel">
                                <i class="x icon"></i>
                                Cancel
                            </span>

                            <span class="right floated" @click="add" :class="restaurant.name == '' ? 'disabled' : ''"  :disabled="restaurant.name == ''" v-if="!savingInProgress">
                                <i class="save icon"></i>
                                Save
                            </span>
                            <span class="right floated" v-else>
                                <i class="save icon"></i>
                                Saving ...
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    const firebase = require('../firebaseConfig.js')
    import Header from '../components/Header.vue'

    export default {
        data() {
            return {
                restaurant: {
                    name: '',
                    description: '',
                    location: '',
                },
                savingInProgress: false
            }
        },
        components: {
            Header
        },
        computed: {
            ...mapState(['currentUser', 'userProfile'])
        },
        methods: {
            add: function () {
                this.savingInProgress = true;

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
                            "User-Agent"   : "Tryeat.me v.2.0.0 contact nguyen.ismail@gmail.com"
                        }),
                    }
                    )
                    .then(response => response.json())
                    .then(json => {
                        if (json.length) {
                            var latitude = parseFloat(json[0].lat);  
                            var longitude = parseFloat(json[0].lon);

                            this.save({ longitude: longitude, latitude: latitude })
                        }
                    })
                    .catch(() => {
                        // If coordinates of given address are not found we save only address
                        this.save({ longitude: null, latitude: null });
                    })
                    .finally(() => {
                        this.savingInProgress = false;
                    });
            },

            save: function ({ latitude, longitude }) {
                firebase.usersCollection
                    .doc(this.currentUser.uid)
                    .collection('restaurants')
                    .add({
                        createdOn: new Date(),
                        name: this.restaurant.name,
                        tags: this.restaurant.tags,
                        address: this.restaurant.address,
                        latitude: latitude,
                        longitude: longitude,
                        userId: this.currentUser.uid
                    })
                    .then(ref => {
                        this.restaurant.name = ''
                        this.restaurant.tags = ''
                        this.restaurant.address = ''

                        this.$router.push('/');
                    })
                    .catch(console.log)
            },

            cancel: function () {
                this.$router.push('/')
            }
        }
    } 
</script>

<style scoped>
    .ui.card h1,
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

    .extra.content span.disabled {
        cursor: not-allowed;
    }
</style>