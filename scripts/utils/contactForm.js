/* eslint-disable no-unused-vars */

function displayModal() {
    const modal = document.getElementById("contact_modal");
    const prenom = document.getElementById("prenom");
    //clear the form
    document.getElementById("prenom").value = "";
    document.getElementById("nom").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
	modal.style.display = "block";
    prenom.focus();
}

function gestionKeyboardNavigationModal() {
    const modal = document.getElementById("contact_modal");
    modal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.style.display = "none";
        }
    });
}

// Close the modal
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// Get the form values, log them to the console, and close the modal
function submitForm() {
     const firstName = document.getElementById("prenom").value;
    const lastName = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    let isValid = true;
    
    // Check if inputs are valid
    if (!checkInput(firstName, /^[a-zA-Z]+$/)) {
        isValid = false;
        document.getElementById("prenom-error").textContent = "Le prénom doit contenir uniquement des lettres.";
    } else {
        document.getElementById("prenom-error").textContent = "";
    }
    if (!checkInput(lastName, /^[a-zA-Z]+$/)) {
        isValid = false;
        document.getElementById("nom-error").textContent = "Le nom doit contenir uniquement des lettres.";
    } else {
        document.getElementById("nom-error").textContent = "";
    }
    if (!checkInput(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        isValid = false;
        document.getElementById("email-error").textContent = "L'email doit être valide.";
    } else {
        document.getElementById("email-error").textContent = "";
    }
    if (message === "") {
        isValid = false;
        document.getElementById("message-error").textContent = "Le message ne peut pas être vide.";
    } else {
        document.getElementById("message-error").textContent = "";
    }
    
    if (isValid) {
        console.log(`Prénom : ${firstName}\nNom : ${lastName}\nEmail : ${email}\nMessage : ${message}`);
        closeModal();
    }
}

//check if the input is valid
function checkInput(input, regex) {
    if (regex.test(input)) {
        return true;
    } else {
        return false;
    }
}