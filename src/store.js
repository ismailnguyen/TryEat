import Vue from 'vue'
import Vuex from 'vuex'
const firebase = require('./firebaseConfig.js')

Vue.use(Vuex)

// handle page reload
firebase.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
        store.dispatch('fetchUserProfile')

        firebase.restaurantsCollection
        .orderBy('name', 'asc')
        .onSnapshot(querySnapshot => {
            let restaurantsArray =  []

            querySnapshot.forEach(doc => {
                let restaurant = doc.data()
                restaurant.id = doc.id
                restaurantsArray.push(restaurant)
            })

            store.commit('setRestaurants', restaurantsArray)
        })

        firebase.usersCollection
        .doc(user.uid)
        .onSnapshot(doc => {
            store.commit('setUserProfile', doc.data())
        })
    }
})

export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        restaurants: []
    },
    actions: {
        clearData ({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', null)
            commit('setRestaurants', null)
        },

        fetchUserProfile ({ commit, state }) {
            firebase.usersCollection
            .doc(state.currentUser.uid)
            .get()
            .then(doc => {
                commit('setUserProfile', doc.data())
            })
            .catch(res => {
                console.log(err)
            })
        },

        updateProfile({ commit, state}, data) {
            let name = data.name;

            firebase.usersCollection
            .doc(state.currentUser.uid)
            .update({ name })
            .catch(res => {
                console.log(err)
            })
        }
    }, 
    mutations: {
        setCurrentUser (state, payload) {
            state.currentUser = payload
        },

        setUserProfile (state, payload) {
            state.userProfile = payload
        },

        setRestaurants (state, payload) {
            state.restaurants = payload || []
        }
    }
})