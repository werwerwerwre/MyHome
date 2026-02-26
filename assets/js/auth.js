import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.login = () => {
    signInWithEmailAndPassword(auth,
        email.value,
        password.value
    ).then(() => location.href = "../main/index.html");
}

window.register = () => {
    createUserWithEmailAndPassword(auth,
        email.value,
        password.value
    ).then(() => location.href = "../main/index.html");
}
