$(document).ready(function() {
            const firebaseConfig = {
                apiKey: "AIzaSyBH97A38GCiKaACSqWYyDMLpgBfC4RlGcc",
                authDomain: "train-scheduler-31e37.firebaseapp.com",
                databaseURL: "https://train-scheduler-31e37.firebaseio.com",
                projectId: "train-scheduler-31e37",
                storageBucket: "",
                messagingSenderId: "684517368633",
                appId: "1:684517368633:web:729ec1309d883f6e"
            };
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);

            // DB Reference
            const database = firebase.database();