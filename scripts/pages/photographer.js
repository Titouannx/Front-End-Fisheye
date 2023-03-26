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

init();

async function init() {
    const id = getId();
    const photographer = await getPhotographer(id);
    photographer.media = await getPhotographerMedia(id);
    console.log(photographer);
    displayPhotographerInfos(photographer);
    displayPhotographerPictures(photographer);
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
}

//create a new section containing the photographer's pictures
function displayPhotographerPictures(photographer) {
    const photographerPictures = document.createElement("section");
    photographerPictures.setAttribute("class", "photographer-pictures");
    const main = document.querySelector("main");
    main.appendChild(photographerPictures);
    photographer.media.forEach((media) => {
        const picture = document.createElement("div");
        picture.setAttribute("class", "picture");
        const pictureImg = document.createElement("img");
        pictureImg.setAttribute("src", `assets/images/${media.image}`);
        pictureImg.setAttribute("alt", `Photo "${media.title}" de ${photographer.name}`);
        picture.appendChild(pictureImg);
        const pictureInfos = document.createElement("div");
        pictureInfos.setAttribute("class", "picture-infos");

        const leftDesc = document.createElement("div");
        leftDesc.setAttribute("class", "leftDesc");
        const rightDesc = document.createElement("div");
        rightDesc.setAttribute("class", "rightDesc");

        const pictureTitle = document.createElement("h3");
        pictureTitle.textContent = media.title;
        leftDesc.appendChild(pictureTitle);

        const pictureLikes = document.createElement("p");
        pictureLikes.textContent = media.likes;
        rightDesc.appendChild(pictureLikes);
        const pictureLikesImg = document.createElement("img");
        pictureLikesImg.setAttribute("src", "assets/icons/heart.svg");
        pictureLikesImg.setAttribute("alt", "Like");
        pictureLikesImg.setAttribute("class", "picture-likes-img");
        rightDesc.appendChild(pictureLikesImg);

        pictureInfos.appendChild(leftDesc);
        pictureInfos.appendChild(rightDesc);

        picture.appendChild(pictureInfos);
        photographerPictures.appendChild(picture);
    });
}