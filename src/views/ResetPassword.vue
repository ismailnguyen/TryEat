<template>
    <div class="ui container">
        
        <div class="ui segment" v-if="performingRequest">
            <div class="ui active dimmer">
                <div class="ui loader"></div>
            </div>
        </div>

        <div v-if="!performingRequest">

            <img class="ui centered bordered circular image" src="static/img/icons/favicon_128.png" alt="">

            <div class="ui form error" v-if="!passwordResetSuccess">
                <h2 class="ui center aligned header">
                    Reset your password
                </h2>

                <div class="field">
                    <label for="inputEmail" class="sr-only">E-mail</label>
                    <input type="email" id="inputEmail" placeholder="Email address" aria-describedby="emailHelp" v-model="email" required autofocus>
                </div>

                <div class="ui error message" v-if="error.message.length">
                    <div class="header">Action Forbidden</div>
                    <p>{{error.message}}</p>
                </div>

                <button class="ui fluid submit button" type="submit" @click="resetPassword()" :disabled="email == ''">Confirm</button>
            </div>

            <div class="ui form error" v-else>
                <h2 class="ui center aligned header">
                    Email Sent
                </h2>

                <p>Check your email for a link to reset your password</p>
                <router-link to="/login">Back to login</router-link>
            </div>

            <p class="mt-5 mb-3 text-muted"><router-link to="/register">Don't have account ? Sign up</router-link></p>
        </div>
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
                passwordResetSuccess: false,
                performingRequest: false
            }
        },
        methods: {
            resetPassword() {
                this.performingRequest = true

                firebase.auth
                .sendPasswordResetEmail(this.email)
                .then(() => {
                    this.performingRequest = false
                    this.passwordResetSuccess = true
                    this.email = ''
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