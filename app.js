import { auth, db, storage } from "./firebase.js";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

window.goProfile = () => location.href="profile.html";
window.goCreate = () => location.href="create.html";
window.goHome = () => location.href="index.html";

window.register = async () => {
  await createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  );
  location.href="index.html";
};

window.login = async () => {
  await signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
  );
  location.href="index.html";
};

window.logout = async () => {
  await signOut(auth);
  location.href="login.html";
};

window.createPost = async () => {
  const file = image.files[0];
  let imageUrl = "";

  if(file){
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file);
    imageUrl = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db,"posts"),{
    content: content.value,
    image: imageUrl,
    user: auth.currentUser.email,
    created: Date.now()
  });

  location.href="index.html";
};

onAuthStateChanged(auth, async (user)=>{
  if(!user && location.pathname.includes("index")){
    location.href="login.html";
  }

  if(document.getElementById("userEmail")){
    userEmail.innerText = user?.email;
  }

  if(document.getElementById("posts")){
    const snapshot = await getDocs(collection(db,"posts"));
    snapshot.forEach(doc=>{
      const data = doc.data();
      posts.innerHTML += `
        <div class="post">
          <b>${data.user}</b>
          <p>${data.content}</p>
          ${data.image ? `<img src="${data.image}" width="100%">` : ""}
        </div>
      `;
    });
  }
});
