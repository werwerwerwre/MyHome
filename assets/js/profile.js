import { auth } from "./firebase.js";
import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (!user) location.href = "../auth/login.html";

    document.getElementById("userInfo").innerHTML = `
        <p>Email: ${user.email}</p>
        <p>ID: ${user.uid}</p>
    `;
});
