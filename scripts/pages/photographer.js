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
    });
}

async function init() {
    const id = getId();
    const photographer = await getPhotographer(id);
    photographer.media = await getPhotographerMedia(id);
    displayPhotographerInfos(photographer);
    displayData(photographer.media);
    displayPriceAndLikes(photographer);
    gestionLikes(photographer.media);
    gestionLightbox(photographer.media);
    gestionKeyboardNavigation();
}

init();

function gestionLikes(medias) {
  const mediaList = document.querySelectorAll(".media");
  let totalLikesCount = getTotalLikes(medias);

  mediaList.forEach(media => {
    const likesCount = media.querySelector(".picture-likes");
    const heartIcon = media.querySelector(".picture-likes-img");

    //on enter keypress on heart icon increase likes count
    heartIcon.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
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
        photographerLikes.setAttribute("aria-label", `Nombre de likes ${totalLikesCount}`);
        photographerLikes.textContent = `${totalLikesCount} likes`;
      };
    });
    
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
      photographerLikes.setAttribute("aria-label", `Nombre de likes ${totalLikesCount}`);
      photographerLikes.textContent = `${totalLikesCount} likes`;
    });
  });
}

function displayPhotographerInfos(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerInfos = document.createElement("div");
    photographerInfos.setAttribute("class", "photographer-infos");
    photographerInfos.setAttribute("tabindex", "0");
    photographerInfos.setAttribute("aria-label", `Photographe ${photographer.name} de ${photographer.city} en ${photographer.country}`);
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
    photographerPicture.setAttribute("tabindex", "0");
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
    photographerPrice.setAttribute("tabindex", "0");
    photographerPrice.textContent = `${photographer.price}€/jour`;
    const photographerLikes = document.createElement("p");
    photographerLikes.textContent = `${getTotalLikes(photographer.media)} likes`;
    const pictureLikesImg = document.createElement("img");
        photographerLikes.setAttribute("aria-label", `Nombre de likes ${photographerLikes.textContent}`);
        photographerLikes.setAttribute("tabindex", "0");
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
const options = document.querySelectorAll(".option");

button.addEventListener('click', function () {
    optionsList.classList.toggle('open');
    //for each option, add an attribute tabindex to make them focusable
    options.forEach(option => {
        option.setAttribute("tabindex", "0");
    });
    //rotate the icon
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

      //remove the attribute tabindex of the options to make them not focusable
      options.forEach(option => {
          option.removeAttribute("tabindex");
      });

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
      gestionLightbox(photographer.media);
      gestionKeyboardNavigation();
    }
  });

  //Listen on keyboard's inputs to interact with the page
  function gestionKeyboardNavigation() {
    const mediaItems = document.querySelectorAll(".mediaMini");
    const lightbox = document.getElementById("lightbox");
    options.forEach(option => {
        option.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.target.click();
            }
        })
    });
    mediaItems.forEach(mediaItem => {
        mediaItem.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.target.click();
            }
        })
    });
    lightbox.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            lightbox.style.display = "none";
        }
    });
    const prevButton = document.getElementById("prev");
    prevButton.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            prevButton.click();
        }
    });
    const nextButton = document.getElementById("next");
    nextButton.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            nextButton.click();
        }
    });
    //on the lightbox, listen on the left and right arrow keys to navigate between the medias
    document.addEventListener("keydown", (e) => {
      if(lightbox.style.display === "flex") {
        if (e.key === "ArrowLeft") {
            prevButton.click();
        }
        if (e.key === "ArrowRight") {
            nextButton.click();
        }
      }
    });
    //when lightbox is open, let the tab key only focus on the controls of the lightbox
    /*
    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "flex" && e.key === "Tab") {
            e.preventDefault();
            if (document.activeElement === document.getElementById("close")) {
              console.log("close");
                nextButton.focus();
            } else if (document.activeElement === nextButton) {
                console.log("next");
                lightbox.getElementsByTagName("img")[0].focus();
            } else if (document.activeElement === lightbox.getElementsByTagName("img")[0]) {
                console.log("img");
                prevButton.focus();
            }
             else if (document.activeElement === prevButton) {
                document.getElementById("close").focus();
                console.log("prev");
            }
        }
    });
    */
   //when lightbox is open, disable the tab key
    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "flex" && e.key === "Tab") {
            e.preventDefault();
        }
    });
}
    

  function gestionLightbox(medias) {
    // Select all media elements
    const mediaElements = document.querySelectorAll(".media");
    const mediaItems = document.querySelectorAll(".mediaMini");

    // Select the lightbox and its content
    const lightbox = document.getElementById("lightbox");
    const lightboxContent = document.querySelector(".lightbox-content");

    // Select the media container, previous and next buttons
    const mediaContainer = document.querySelector(".media-container");
    let prevButton = document.getElementById("prev");
    let nextButton = document.getElementById("next");

    // Create a variable to keep track of the current media index
    let currentMediaIndex;

    // Add click event listener to each media element
    mediaElements.forEach((media, index) => {
      const mediaPicOrVid = media.querySelector(".mediaMini");
      mediaPicOrVid.addEventListener("click", () => {
        // Display the lightbox
        lightbox.style.display = "flex";

        // Set the current media index
        currentMediaIndex = index;

        // Add the clicked media to the lightbox content
        displayMedia(index);

    });
    });

    function showVideosControls(boolean) {
        const video = lightboxContent.querySelector("video");
        if (boolean) {
          video.controls = true;
        } else {
          video.controls = false;
        }
      }

    function displayMedia(index) {
        // Set the current media index
        currentMediaIndex = index;
      
        // Remove the current media element from the lightbox content
        lightboxContent.innerHTML = "";
      
        // Create a new media element and add it to the lightbox content
        const newMedia = mediaItems[currentMediaIndex].cloneNode(true);
        lightboxContent.innerHTML = "<span tabindex='0' class='close'>&times;</span>"
        lightboxContent.appendChild(newMedia);
        const divPrevNext = document.createElement("div");
        divPrevNext.setAttribute("class", "prev-next-buttons");
        lightboxContent.appendChild(divPrevNext);
        prevButton = document.createElement("button");
        prevButton.setAttribute("id", "prev");
        prevButton.setAttribute("class", "prev");
        prevButton.innerHTML = "&lt;";
        prevButton.setAttribute("tabindex", "0");
        nextButton = document.createElement("button");
        nextButton.setAttribute("id", "next");
        nextButton.setAttribute("class", "next");
        nextButton.innerHTML = "&gt;";
        nextButton.setAttribute("tabindex", "0");
        divPrevNext.appendChild(prevButton);
        divPrevNext.appendChild(nextButton);
        gestionBtnLightBox();
        if(newMedia.tagName === "VIDEO"){
          showVideosControls(true);
        }
        lightbox.getElementsByTagName("img")[0].focus();
      }

  function gestionBtnLightBox(){
    // Add click event listener to previous button
    prevButton.addEventListener("click", () => {
      // Decrement the current media index
      currentMediaIndex--;

      if (currentMediaIndex < 0) {
          currentMediaIndex = mediaElements.length - 1;
      }

      // Display the new media
      displayMedia(currentMediaIndex);
      });

      // Add click event listener to next button
      nextButton.addEventListener("click", () => {
      // Increment the current media index
      currentMediaIndex++;

      // If the current media index is greater than the last media index, set it to 0
      if (currentMediaIndex >= mediaElements.length) {
          currentMediaIndex = 0;
      }

      // Display the new media
      displayMedia(currentMediaIndex);
      });

      // Add click event listener to close button
      const closeButton = document.querySelector(".close");
      closeButton.addEventListener("click", () => {

      // Hide the lightbox
      lightbox.style.display = "none";
      showVideosControls(false)
    });
    }
    gestionBtnLightBox()

  }