<template>
    <div class="text-center">
        <transition name="fade">
            <div v-if="performingRequest" class="loading">
                <p>Loading...</p>
            </div>
        </transition>

        <form class="form-signin">
            <img class="mb-4" src="static/img/icons/favicon_128.png" alt="" width="128" height="128">

            <div v-if="!passwordResetSuccess">
                <h1 class="h3 mb-3 font-weight-normal">Reset your password</h1>

                <p class="secondary-color">{{error.message}}</p>

                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" aria-describedby="emailHelp" v-model="email" required autofocus>

                <span class="btn btn-lg btn-outline-primary btn-block" @click="resetPassword">Confirm</span>

                <p class="mt-5 mb-3 text-muted"><router-link to="/register">Don't have account ? Sign up</router-link></p>
            </div>

            <div v-else>
                <h1>Email Sent</h1>
                <p>check your email for a link to reset your password</p>
                <router-link to="/login">Back to login</router-link>
            </div>
        </form>
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
                passwordResetSuccess: false
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