function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    //clear the form
    document.getElementById("prenom").value = "";
    document.getElementById("nom").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function submitForm() {
    const firstName = document.getElementById("prenom").value;
    const lastName = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    console.log(`Prénom : ${firstName}\nNom : ${lastName}\nEmail : ${email}\nMessage : ${message}`);
    closeModal();
}

const regexName = /^[a-zA-ZéèêëïîôöûüàâäçÉÈÊËÏÎÔÖÛÜÀÂÄÇ]+$/;
const regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

//check if the input is valid
function checkInput(input, regex) {
    if (regex.test(input)) {
        return true;
    } else {
        return false;
    }
}