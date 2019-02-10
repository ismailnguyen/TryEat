<template>
    <div class="ui container">
        <div class="ui segment" v-if="performingRequest">
            <div class="ui active dimmer">
                <div class="ui loader"></div>
            </div>
        </div>

        <div class="ui form error" v-if="!performingRequest">

            <h2 class="ui center aligned header">
                <img class="ui medium bordered circular image" src="static/img/icons/favicon_128.png" alt="" width="128" height="128">
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
            
            <div class="ui fluid submit button" @click="login">Sign in</div>
        </div>

        <p class="mt-5 mb-3 text-muted"><router-link to="/register">Don't have account ? Sign up</router-link></p>
        <p class="mt-5 mb-3 text-muted"><router-link to="/reset-password">Forgot password ?</router-link></p>
    </div>
</template>

<script>
    const firebase = require('../firebaseConfig.js')
    
    export default {
        data() {
            return {
                email: 'demo@demo.com',
                password: 'demo@demo.com',
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
                .catch(err => {
                    console.log(err)
                    this.performingRequest = false
                    this.error = err
                })
            }
        }
    }
</script>

<style scoped>
    .form-control {
        color: black;
        border: none;
        border-radius: 0.75rem;
        background-color: #ced4da70;
    }

    .form-control::placeholder {
        color: #fff;
        opacity: 1;
    }

    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;
    }

    .form-signin .checkbox {
        font-weight: 400;
    }

    .form-signin .form-control {
        opacity: 0.9;
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }

    .form-signin .form-control:focus {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>