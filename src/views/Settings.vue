<template>
    <div class="ui container">
        
        <Header />

        <h1>Settings</h1>

        <h4>My profile</h4>

        <div class="ui success message" v-if="showSuccess">
            <i class="close icon"></i>
            <div class="header">
                Profile updatedl.
            </div>
        </div>

        <form class="ui form" @submit.prevent>
            <div class="field">
                <label>Email</label>
                <input type="email" name="email" v-model="currentUser.email" disabled>
            </div>
            <div class="field">
                <label>Name</label>
                <input type="text" name="name" placeholder="Name" v-model="userProfile.name">
            </div>
            <button class="ui button" type="submit" @click="updateProfile()">Update</button>
        </form>

         <a class="negative ui button signout-button" @click="logout()">
            <i class="big sign-out icon"></i>
            Sign out
        </a>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    const firebase = require('../firebaseConfig.js')
    import Header from '../components/Header.vue'

    export default {
        data () {
            return {
                name: '',
                showSuccess: false
            }
        },
        components: {
            Header
        },
        computed: {
        ...mapState(['currentUser', 'userProfile'])
        },
        methods: {
            updateProfile() {
                this.$store.dispatch('updateProfile', {
                    name: this.name !== '' ? this.name : this.userProfile.name
                })

                this.name = ''
                this.title = ''

                this.showSuccess = true

                setTimeout(() => {
                    this.showSuccess = false
                }, 2000)
            },
            logout() {
                firebase.auth
                .signOut()
                .then(() => {
                    this.$store.dispatch('clearData')
                    this.$router.push('/login')
                })
                .catch(console.log)
            }
        }
    }
</script>

<style scoped>
    .signout-button {
        position: fixed;
        bottom: 70px;
        width: 90%;
        margin: auto;
        right: 0;
        left: 0;
    }
</style>
