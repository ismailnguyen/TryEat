<template>
    <div class="ui container">

        <div class="ui segment" v-if="performingRequest">
            <div class="ui active dimmer">
                <div class="ui massive text loader"></div>
            </div>
        </div>

        <div class="ui form error" v-if="!performingRequest">

            <img class="ui centered bordered circular image" src="static/img/icons/favicon_128.png" alt="">

            <h2 class="ui center aligned header">
                Please sign in
            </h2>

            <div class="field">
                <label for="inputEmail" class="sr-only">E-mail</label>
                <input type="email" id="inputEmail" placeholder="Email address" aria-describedby="emailHelp" v-model="email" required autofocus>
            </div>

            <div class="field">
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" placeholder="Password" v-model="password" @keyup.enter="login" required>
            </div>

            <div class="ui error message" v-if="error.message.length">
                <div class="header">Action Forbidden</div>
                <p>{{error.message}}</p>
            </div>
            
            <button class="ui fluid submit button" type="submit" @click="login()" :disabled="email == '' || password == ''">Sign in</button>

            <p class="mt-5 mb-3 text-muted"><router-link to="/register">Don't have account ? Sign up</router-link></p>
            <p class="mt-5 mb-3 text-muted"><router-link to="/reset-password">Forgot password ?</router-link></p>
        </div>
    </div>
</template>

<script>
    const firebase = require('../firebaseConfig.js')
    
    export default {
        data() {
            return {
                email: '',
                password: '',
                error: {
                    message: ''
                },
                performingRequest: false
            }
        },
        methods: {
            login() {
                this.performingRequest = true

                firebase.auth
                .signInWithEmailAndPassword(this.email, this.password)
                .then(firebaseUser => {
                    this.$store.commit('setCurrentUser', firebaseUser.user)
                    this.$store.dispatch('fetchUserProfile')

                    this.performingRequest = false
                    this.$router.push('/dashboard')
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