<template>
    <div class="ui container">

        <Header />

        <h1>Add a restaurant</h1>

        <div class="ui form">
            <div class="field">
                <label for="inputName" class="sr-only">Name</label>
                <input type="text" id="inputName" placeholder="Name" aria-describedby="nameHelp" v-model="restaurant.name" required>
            </div>

            <div class="field">
                <label for="inputLocation" class="sr-only">Location <small><i>(optional)</i></small></label>
                <input type="text" id="inputLocation" placeholder="eg. 15 rue Jean Jaures, 75015 Paris" aria-describedby="locationHelp" v-model="restaurant.location">
            </div>

            <div class="field">
                <label for="inputDescription" class="sr-only">Tags <small><i>(optional)</i></small></label>
                <textarea id="inputDescription" placeholder="Separated with comma" aria-describedby="descriptionHelp" v-model="restaurant.description"></textarea>
            </div>

            <div class="field">
                <button class="ui inverted basic button" type="submit" @click="cancel()">Cancel</button>
                <button class="ui submit button" type="submit" @click="add()" :disabled="restaurant.name == ''">Add</button>
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
                }
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
                firebase.usersCollection
                .doc(this.currentUser.uid)
                .collection('restaurants')
                .add({
                    createdOn: new Date(),
                    name: this.restaurant.name,
                    description: this.restaurant.description,
                    location: this.restaurant.location,
                    userId: this.currentUser.uid
                })
                .then(ref => {
                    this.restaurant.name = ''
                    this.restaurant.description = ''
                    this.restaurant.location = ''

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