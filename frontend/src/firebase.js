import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNulmfxcVkOasOu65PINmQAsNajMI7GF8",
  authDomain: "mern-project-1e4c4.firebaseapp.com",
  projectId: "mern-project-1e4c4",
  storageBucket: "mern-project-1e4c4.appspot.com",
  messagingSenderId: "78082095053",
  appId: "1:78082095053:web:304a75d34bd44b9535f684",
  measurementId: "G-SHK0YX69XG"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {

    return new Promise((resolve, reject) => {
        auth.signInWithPopup(googleProvider).then((res) => {
          console.log(res.user)
          return resolve("SUCCESS");
        }).catch((error) => {
            console.log(error.message)
            return reject("FAIL");
        })
    })

}