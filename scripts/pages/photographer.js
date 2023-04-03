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
    displayData(photographer.media)
    displayPriceAndLikes(photographer)
}

init();

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
}

//on click on a picture, display the modal of a carousel
function displayCarousel() {
    const pictures = document.querySelectorAll(".picture");
    pictures.forEach((picture) => {
        picture.addEventListener("click", () => {
            const modal = document.querySelector(".modal");
            modal.style.display = "block";
            const carousel = document.querySelector(".carousel");
            carousel.style.display = "block";
            const carouselImage = document.querySelector(".carousel-image");
            carouselImage.setAttribute("src", picture.getAttribute("src"));
        })
    })
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