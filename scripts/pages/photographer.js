async function getPhotographers() {
    // fetch data/photographers.json in a photographers variable
    let photographers = await fetch("data/photographers.json")
        .then((response) => response.json())
        .then((data) => data.photographers);
    // return photographers
    
    return { photographers };
}

// get media from data/photographers.json
async function getMedia() {
    let media = await fetch("data/photographers.json")
        .then((response) => response.json())
        .then((data) => data.media);
    return { media };
}

// get the id in the url
function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return id;
}

// get the photographer with the id
async function getPhotographer(id) {
    const { photographers } = await getPhotographers();
    const photographer = photographers.find(photographer => photographer.id == id);
    return photographer;
}

// get media of the photographer with the id
async function getPhotographerMedia(id) {
    const { media } = await getMedia();
    const photographerMedia = media.filter(media => media.photographerId == id);
    return photographerMedia;
}

async function displayData(medias) {
    const photographerPictures = document.createElement("section");
    photographerPictures.setAttribute("class", "photographer-pictures");
    const main = document.querySelector("main");
    main.appendChild(photographerPictures);

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaDOM = mediaModel.getMediaDOM();
        photographerPictures.appendChild(mediaDOM);
        console.log(photographerFactory(media))
    });
}

async function init() {
    const id = getId();
    const photographer = await getPhotographer(id);
    photographer.media = await getPhotographerMedia(id);
    console.log(photographer);
    console.log(photographer.media);
    displayPhotographerInfos(photographer);
    displayData(photographer.media);
    displayPriceAndLikes(photographer);
    gestionLikes(photographer.media);
}

init();

function gestionLikes(medias) {
  const mediaList = document.querySelectorAll(".media");
  let totalLikesCount = getTotalLikes(medias);

  mediaList.forEach(media => {
    const likesCount = media.querySelector(".picture-likes");
    const heartIcon = media.querySelector(".picture-likes-img");
    
    heartIcon.addEventListener("mousedown", () => {
      let currentLikesCount = parseInt(likesCount.innerText);
      if (heartIcon.classList.contains("liked")) {
        currentLikesCount--;
        totalLikesCount--;
      } else {
        currentLikesCount++;
        totalLikesCount++;
      }
      likesCount.innerText = currentLikesCount;
      heartIcon.classList.toggle("liked");
      const photographerLikes = document.querySelector(".photographer-price-and-likes .photographer-price-and-likes-left p");
      photographerLikes.textContent = `${totalLikesCount} likes`;
    });
  });
}

function displayPhotographerInfos(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerInfos = document.createElement("div");
    photographerInfos.setAttribute("class", "photographer-infos");
    photographerHeader.insertBefore(photographerInfos, photographerHeader.firstChild);
    const photographerName = document.createElement("h1");
    photographerName.textContent = photographer.name;
    photographerInfos.appendChild(photographerName);
    const photographerLocalisation = document.createElement("h2");
    photographerLocalisation.textContent = `${photographer.city}, ${photographer.country}`;
    photographerInfos.appendChild(photographerLocalisation);
    const photographerTagline = document.createElement("p");
    photographerTagline.textContent = photographer.tagline;
    photographerInfos.appendChild(photographerTagline);
    const photographerPicture = document.createElement("img");
    photographerPicture.setAttribute("src", `assets/photographers/${photographer.portrait}`);
    photographerPicture.setAttribute("alt", `Photo de ${photographer.name}`);
    photographerPicture.setAttribute("class", "photographer-picture");
    photographerHeader.appendChild(photographerPicture);

    //display in the contact modal name of the photographer
    const modalHeader = document.querySelector(".modal_header");
    const modalTitle = document.createElement("h2");
    modalTitle.textContent = "Contactez-moi" + " " + photographer.name;
    modalHeader.insertBefore(modalTitle, modalHeader.firstChild);
}

function displayPriceAndLikes(photographer) {
    const photographerPriceAndLikes = document.createElement("div");
    photographerPriceAndLikes.setAttribute("class", "photographer-price-and-likes");
    //two divs, right and left
    const photographerPriceAndLikesLeft = document.createElement("div");
    photographerPriceAndLikesLeft.setAttribute("class", "photographer-price-and-likes-left");
    const photographerPriceAndLikesRight = document.createElement("div");
    photographerPriceAndLikesRight.setAttribute("class", "photographer-price-and-likes-right");
    photographerPriceAndLikes.appendChild(photographerPriceAndLikesLeft);
    photographerPriceAndLikes.appendChild(photographerPriceAndLikesRight);
    const main = document.querySelector("main");
    main.appendChild(photographerPriceAndLikes);
    const photographerPrice = document.createElement("p");
    photographerPrice.textContent = `${photographer.price}€/jour`;
    const photographerLikes = document.createElement("p");
    photographerLikes.textContent = `${getTotalLikes(photographer.media)} likes`;
    const pictureLikesImg = document.createElement("img");
    pictureLikesImg.setAttribute("src", "assets/icons/heart.svg");
    pictureLikesImg.setAttribute("alt", "Like");
    pictureLikesImg.setAttribute("class", "picture-likes-img");
    photographerPriceAndLikesLeft.appendChild(photographerLikes);
    photographerPriceAndLikesLeft.appendChild(pictureLikesImg);
    photographerPriceAndLikesRight.appendChild(photographerPrice);
}

function getTotalLikes(media) {
    let totalLikes = 0;
    media.forEach((media) => {
        totalLikes += media.likes;
    })
    return totalLikes;
}

const button = document.getElementById('sort-by-btn');
const optionsList = document.getElementById('sort-by-select');

button.addEventListener('click', function () {
    optionsList.classList.toggle('open');
    document.getElementsByClassName("icon-arrow-down")[0].classList.toggle("icon-arrow-up");
  });  

//Ajouter un EventListener pour chaque option de tri
optionsList.addEventListener("click", async (e) => {
    if (e.target.tagName === "LI") {
        const id = getId();
        const photographer = await getPhotographer(id);
        photographer.media = await getPhotographerMedia(id);
        medias = photographer.media;
      // Mettre à jour le texte du bouton avec la nouvelle option sélectionnée
      const optionText = e.target.textContent;
      button.textContent = optionText;
      let iconArrow = document.createElement("img");
        iconArrow.setAttribute("src", "assets/icons/arrow.svg");
        iconArrow.setAttribute("alt", 'Flèche menu déroulant "Trier par"');
        iconArrow.setAttribute("class", "icon-arrow-down");
        button.appendChild(iconArrow);
      optionsList.classList.remove("open");
  
      // Récupérer la valeur de l'option sélectionnée
      let value = optionText.toLowerCase();
  
      // Trier les médias selon la valeur de l'option sélectionnée
      let sortedMedias = [];
      if (value === "popularité") {
        sortedMedias = medias.sort((a, b) => b.likes - a.likes);
      } else if (value === "date") {
        sortedMedias = medias.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      } else if (value === "titre") {
        sortedMedias = medias.sort((a, b) => a.title.localeCompare(b.title));
      }
  
      // Supprimer tous les médias existants de la section
      const photographerPictures = document.querySelector(".photographer-pictures");
      photographerPictures.innerHTML = "";
  
      // Ajouter chaque élément de média trié à la section
      sortedMedias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaDOM = mediaModel.getMediaDOM();
        photographerPictures.appendChild(mediaDOM);
      });
      gestionLikes(photographer.media);
    }
  });

  

