import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDfS9XG73ffVJM5pcN_GNURkZCfqlzs6Jo",
    authDomain: "currency-exchange-ulibre.firebaseapp.com",
    projectId: "currency-exchange-ulibre",
    storageBucket: "currency-exchange-ulibre.firebasestorage.app",
    messagingSenderId: "745964915638",
    appId: "1:745964915638:web:e506d52c0dccff373a0f17"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Iniciar sesión
document.getElementById("signInBtn")?.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Inicio de sesión exitoso");
        window.location.href = "/dashboard.html";
    } catch (error) {
        alert(error.message);
    }
});

// Registrarse
document.getElementById("signUpBtn")?.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), { email, role });
        alert("Registro exitoso");
        window.location.href = "/dashboard.html";
    } catch (error) {
        alert(error.message);
    }
});
