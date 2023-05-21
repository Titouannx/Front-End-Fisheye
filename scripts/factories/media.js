/* eslint-disable no-unused-vars */
function mediaFactory(data){
    const { title, image, video, likes, date, price } = data;

    function getMediaDOM() {
        const media = document.createElement( 'div' );
        media.setAttribute("class", "media");
        // Creating a picture element with an image or video thumbnail
        const picture = document.createElement("div");
        const pictureImg = document.createElement( 'img' );
        const pictureVideo = document.createElement( 'video' );
        let type = "";
        if(image){
            type = "photo";
            picture.setAttribute("class", "picture");
            pictureImg.setAttribute("src", `assets/images/${image}`);
            pictureImg.setAttribute("alt", "Photo de " + title);
            pictureImg.setAttribute("class", "mediaMini");
            pictureImg.setAttribute("tabindex", "0")
            pictureImg.setAttribute("aria-label", "Photo de " + title);
            picture.appendChild(pictureImg);
        } else if(video){
            type = "video";
            const overlayPlay = document.createElement( 'img' );
            picture.setAttribute("class", "video");
            pictureVideo.setAttribute("src", `assets/images/${video}`);
            pictureVideo.setAttribute("alt", "Vidéo de " + title);
            pictureVideo.setAttribute("class", "mediaMini");
            pictureVideo.setAttribute("tabindex", "0")
            pictureVideo.setAttribute("aria-label", "Vidéo de " + title);
            overlayPlay.setAttribute("src", `assets/icons/play-button.png`);
            overlayPlay.setAttribute("class", "overlay-play");
            overlayPlay.setAttribute("alt", "Bouton play");
            picture.appendChild(overlayPlay);
            picture.appendChild(pictureVideo);
        }
        // Creating a div element for media informations
        const pictureInfos = document.createElement("div");
        pictureInfos.setAttribute("class", "picture-infos");
        // Creating two divs for title and likes information, to be positioned on the left and right of the pictureInfos's bottom
        const leftDesc = document.createElement("div");
        leftDesc.setAttribute("class", "leftDesc");
        const rightDesc = document.createElement("div");
        rightDesc.setAttribute("class", "rightDesc");
        // Adding picture title to leftDesc div
        const pictureTitle = document.createElement("h3");
        pictureTitle.textContent = title;
        pictureTitle.setAttribute("tabindex", "0")
        pictureTitle.setAttribute("aria-label", `Titre de la ${type} ` + title);
        leftDesc.appendChild(pictureTitle);
        // Adding picture likes and a heart icon to rightDesc div
        const pictureLikes = document.createElement("p");
        pictureLikes.textContent = likes;
        pictureLikes.setAttribute("class", "picture-likes");
        pictureLikes.setAttribute("tabindex", "0")
        pictureLikes.setAttribute("aria-label", `Nombre de likes de la ${type} ` + likes);
        rightDesc.appendChild(pictureLikes);
        const pictureLikesImg = document.createElement("img");
        pictureLikesImg.setAttribute("src", "assets/icons/heart.svg");
        pictureLikesImg.setAttribute("alt", "Like");
        pictureLikesImg.setAttribute("class", "picture-likes-img");
        pictureLikesImg.setAttribute("tabindex", "0")
        pictureLikesImg.setAttribute("aria-label", "Bouton like")
        rightDesc.appendChild(pictureLikesImg);
        // Adding leftDesc and rightDesc divs to pictureInfos
        pictureInfos.appendChild(leftDesc);
        pictureInfos.appendChild(rightDesc);
        // Adding picture and pictureInfos to media
        picture.appendChild(pictureInfos);
        media.appendChild(picture);
        // Returning media element
        return (media);
    }
    // Returning an object with media data and a method to create a DOM element
    return { title, image, video, likes, date, price, getMediaDOM }
}