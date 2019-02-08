import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyB_QF-woktt09rDQa7jko_-3xnbRouiLKE",
    authDomain: "tryeat-b38cd.firebaseapp.com",
    databaseURL: "https://tryeat-b38cd.firebaseio.com",
    projectId: "tryeat-b38cd",
    storageBucket: "tryeat-b38cd.appspot.com",
    messagingSenderId: "1071017466056"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}