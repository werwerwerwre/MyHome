import { auth, db, storage } from "./firebase.js";
import { addDoc, collection } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

window.addPost = async () => {

    const text = document.getElementById("postText").value;
    const file = document.getElementById("imageInput").files[0];
    let imageUrl = "";

    if (file) {
        const storageRef = ref(storage, "images/" + Date.now());
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, "myhub_posts"), {
        text,
        user: auth.currentUser.email,
        created: new Date(),
        image: imageUrl
    });

    location.href = "../main/index.html";
}
