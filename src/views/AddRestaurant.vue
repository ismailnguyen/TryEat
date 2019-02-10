<template>
    <div class="ui container">
        
        <h1 class="ui header">
            Restaurant
        </h1>

        <div class="ui form">
            <div class="field">
                <label for="inputName" class="sr-only">Name</label>
                <input type="text" id="inputName" placeholder="Name" aria-describedby="nameHelp" v-model="restaurant.name" required>
            </div>

            <div v-if="showMoreFields">
                <div class="field">
                    <label for="inputLocation" class="sr-only">Location</label>
                    <input type="text" id="inputLocation" placeholder="Location" aria-describedby="locationHelp" v-model="restaurant.location">
                </div>

                <div class="field">
                    <label for="inputDescription" class="sr-only">Description</label>
                    <textarea id="inputDescription" placeholder="Description" aria-describedby="descriptionHelp" v-model="restaurant.description"></textarea>
                </div>
            </div>

            <div class="inline field" v-if="!showMoreFields">
                <div class="ui toggle checkbox" @click="showMoreFields = !showMoreFields">
                    <input type="checkbox" tabindex="0" class="hidden">
                    <label>More fields</label>
                </div>
            </div>

            <div class="ui fluid submit button" @click="add()" :disabled="restaurant.name == ''">Submit</div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    const firebase = require('../firebaseConfig.js')

    export default {
        data() {
            return {
                restaurant: {
                    name: '',
                    description: '',
                    location: '',
                },
                showMoreFields: false
            }
        },
        computed: {
            ...mapState(['currentUser', 'userProfile'])
        },
        methods: {
            add() {
                firebase.restaurantsCollection
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
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    } 
</script>