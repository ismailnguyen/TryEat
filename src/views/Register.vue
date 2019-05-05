<template>
    <div class="ui container">
        <div class="ui segment" v-if="performingRequest">
            <p></p>
            <div class="ui active dimmer">
                <div class="ui loader"></div>
            </div>
        </div>

         <div class="ui form error" v-if="!performingRequest">

            <img class="ui centered bordered circular image" src="static/img/icons/favicon_128.png" alt="">
            
            <h2 class="ui center aligned header">
                Create your account
            </h2>

            <div class="field">
                <label for="inputName" class="sr-only">Name</label>
                <input type="text" id="inputName" placeholder="Name" aria-describedby="nameHelp" v-model="name" required autofocus>
            </div>

            <div class="field">
                <label for="inputEmail" class="sr-only">E-mail</label>
                <input type="email" id="inputEmail" placeholder="Email address" aria-describedby="emailHelp" v-model="email" required>
            </div>

            <div class="field">
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" placeholder="Password" v-model="password" @keyup.enter="register" required>
            </div>

            <div class="ui error message" v-if="error.message.length">
                <div class="header">Action Forbidden</div>
                <p>{{error.message}}</p>
            </div>
            
            <button class="ui fluid submit button" type="submit" @click="register()" :disabled="name == '' || email == '' || password == ''">Sign up</button>
        
            <p class="mt-5 mb-3 text-muted"><router-link to="/login">Already have account ? Sign in</router-link></p>
        </div>
    </div>
</template>

<script>
    const firebase = require('../firebaseConfig.js')
    
    export default {
        data() {
            return {
                email: 'demo@demo.com',
                name: 'Demo',
                password: 'demo@demo.com',
                error: {
                    message: ''
                },
                performingRequest: false
            }
        },
        methods: {
            register () {
                this.performingRequest = true
                
                firebase.auth
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(firebaseUser => {
                    let user = firebaseUser.user;

                    this.$store.commit('setCurrentUser', user)

                    // create user obj
                    firebase.usersCollection
                    .doc(user.uid)
                    .set({
                        name: this.name
                    })
                    .then(() => {
                        this.$store.dispatch('fetchUserProfile')
                        this.performingRequest = false
                        this.$router.push('/dashboard')
                    })
                    .catch(error => {
                        console.log(error)
                        this.performingRequest = false
                        this.error = error
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.performingRequest = false
                    this.error = error
                })
            }
        }
    }
</script>

<style scoped>
    .ui.header {
        color: white;
    }

    .ui.segment {
        padding-top: 450px;
        background: none;
        border: none;
    }

    .ui.dimmer {
        background: none;
    }
</style>