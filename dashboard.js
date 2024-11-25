import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, addDoc, query, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

// Verificar el estado del usuario
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const role = userDoc.data()?.role || "Usuario";

        document.getElementById("userRole").innerText = `Rol: ${role}`;
    } else {
        window.location.href = "/login.html";
    }
});

// Mostrar pacientes (con botón de creación)
window.showPatients = async () => {
    const patientsQuery = query(collection(db, "patients"));
    const patientsSnapshot = await getDocs(patientsQuery);

    const content = document.getElementById("content");
    content.innerHTML = `
        <h2>Gestión de Pacientes</h2>
        <button onclick="showForm('patient')">+ Agregar Paciente</button>
        <ul>`;
    patientsSnapshot.forEach((doc) => {
        const patient = doc.data();
        content.innerHTML += `<li>${patient.name} - ${patient.condition}</li>`;
    });
    content.innerHTML += `</ul>`;
};

// Mostrar citas (con botón de creación)
window.showAppointments = async () => {
    const appointmentsQuery = query(collection(db, "appointments"));
    const appointmentsSnapshot = await getDocs(appointmentsQuery);

    const content = document.getElementById("content");
    content.innerHTML = `
        <h2>Gestión de Citas</h2>
        <button onclick="showForm('appointment')">+ Agregar Cita</button>
        <ul>`;
    appointmentsSnapshot.forEach((doc) => {
        const appointment = doc.data();
        content.innerHTML += `<li>${appointment.date} - ${appointment.patientName}</li>`;
    });
    content.innerHTML += `</ul>`;
};

// Mostrar recordatorios
window.showReminders = () => {
    const content = document.getElementById("content");
    content.innerHTML = `
        <h2>Recordatorios</h2>
        <p>Esta funcionalidad estará disponible pronto.</p>`;
};

// Cerrar sesión
window.logout = async () => {
    await signOut(auth);
    window.location.href = "/login.html";
};

// Mostrar el formulario dinámico
window.showForm = (type) => {
    const form = document.getElementById("dynamicForm");
    const formTitle = document.getElementById("formTitle");
    const formFields = document.getElementById("formFields");

    form.style.display = "block";
    formFields.innerHTML = ""; // Limpiar formulario

    // Configurar el formulario según el tipo
    if (type === "patient") {
        formTitle.innerText = "Agregar Paciente";
        formFields.innerHTML = `
            <label>Nombre:</label>
            <input type="text" id="patientName" required>
            <label>Condición:</label>
            <input type="text" id="patientCondition" required>
        `;
        form.onsubmit = savePatient;
    } else if (type === "appointment") {
        formTitle.innerText = "Agregar Cita";
        formFields.innerHTML = `
            <label>Fecha:</label>
            <input type="date" id="appointmentDate" required>
            <label>Nombre del Paciente:</label>
            <input type="text" id="appointmentPatient" required>
        `;
        form.onsubmit = saveAppointment;
    }
};

// Cerrar formulario dinámico
window.closeForm = () => {
    document.getElementById("dynamicForm").style.display = "none";
};

// Guardar un nuevo paciente
window.savePatient = async (e) => {
    e.preventDefault();

    const name = document.getElementById("patientName").value;
    const condition = document.getElementById("patientCondition").value;

    try {
        await addDoc(collection(db, "patients"), { name, condition });
        alert("Paciente agregado con éxito");
        closeForm();
        showPatients();
    } catch (error) {
        alert("Error al guardar el paciente: " + error.message);
    }
};

// Guardar una nueva cita
window.saveAppointment = async (e) => {
    e.preventDefault();

    const date = document.getElementById("appointmentDate").value;
    const patientName = document.getElementById("appointmentPatient").value;

    try {
        await addDoc(collection(db, "appointments"), { date, patientName });
        alert("Cita agregada con éxito");
        closeForm();
        showAppointments();
    } catch (error) {
        alert("Error al guardar la cita: " + error.message);
    }
};
