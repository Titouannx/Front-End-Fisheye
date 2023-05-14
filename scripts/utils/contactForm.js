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
    console.log(prenom);
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
    console.log(`Prénom : ${firstName}\nNom : ${lastName}\nEmail : ${email}\nMessage : ${message}`);
    closeModal();
}

//check if the input is valid
function checkInput(input, regex) {
    if (regex.test(input)) {
        return true;
    } else {
        return false;
    }
}