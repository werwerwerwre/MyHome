import { auth, db } from "./firebase.js";
import { collection, getDocs, query, orderBy } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.goProfile = () => location.href = "../profile/profile.html";
window.goCreate = () => location.href = "../create/create.html";

onAuthStateChanged(auth, async (user) => {
    if (!user) location.href = "../auth/login.html";

    const postsDiv = document.getElementById("posts");
    const q = query(collection(db, "myhub_posts"), orderBy("created", "desc"));
    const snapshot = await getDocs(q);

    snapshot.forEach(doc => {
        const post = doc.data();
        postsDiv.innerHTML += `
            <div class="post">
                <b>${post.user}</b>
                <p>${post.text}</p>
            </div>
        `;
    });
});
