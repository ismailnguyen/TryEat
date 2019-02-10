<template>
    <div>
        <div class="ui segment" v-if="performingRequest">
            <p></p>
            <div class="ui active dimmer">
                <div class="ui loader"></div>
            </div>
        </div>
        
        <form class="form-signin">
            <img class="mb-4" src="static/img/icons/favicon_128.png" alt="" width="128" height="128">

            <h1 class="h3 mb-3 font-weight-normal">Create your account</h1>

            <p class="secondary-color">{{error.message}}</p>

            <label for="inputName" class="sr-only">Name</label>
            <input type="text" id="inputName" class="form-control" placeholder="Name" aria-describedby="nameHelp" v-model="name" required autofocus>
            
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" aria-describedby="emailHelp" v-model="email" required autofocus>

            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" @keyup.enter="login" required>

            <span class="btn btn-lg btn-outline-primary btn-block" @click="register">Sign up</span>

            <p class="mt-5 mb-3 text-muted"><router-link to="/login">Already have account ? Sign in</router-link></p>
        </form>
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
                    console.log(user)
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
                    .catch(err => {
                        console.log(err)
                        this.performingRequest = false
                        this.error = err
                    })
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