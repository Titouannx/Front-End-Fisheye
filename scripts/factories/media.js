function mediaFactory(data){
    const { title, image, video, likes, date, price } = data;

    function getMediaDOM() {
        const media = document.createElement( 'div' );
        media.setAttribute("class", "media");
        //if image display image, else display video thumbnail
        const picture = document.createElement("div");
        const pictureImg = document.createElement( 'img' );
        const pictureVideo = document.createElement( 'video' );
        if(image){
            picture.setAttribute("class", "picture");
            pictureImg.setAttribute("src", `assets/images/${image}`);
            pictureImg.setAttribute("alt", "Photo de " + title);
            picture.appendChild(pictureImg);
        } else if(video){
            const overlayPlay = document.createElement( 'img' );
            picture.setAttribute("class", "video");
            pictureVideo.setAttribute("src", `assets/images/${video}`);
            pictureVideo.setAttribute("alt", "Vidéo de " + title);
            overlayPlay.setAttribute("src", `assets/icons/play-button.png`);
            overlayPlay.setAttribute("class", "overlay-play");
            picture.appendChild(overlayPlay);
            picture.appendChild(pictureVideo);
        }
        const pictureInfos = document.createElement("div");
        pictureInfos.setAttribute("class", "picture-infos");

        const leftDesc = document.createElement("div");
        leftDesc.setAttribute("class", "leftDesc");
        const rightDesc = document.createElement("div");
        rightDesc.setAttribute("class", "rightDesc");

        const pictureTitle = document.createElement("h3");
        pictureTitle.textContent = title;
        leftDesc.appendChild(pictureTitle);

        const pictureLikes = document.createElement("p");
        pictureLikes.textContent = likes;
        rightDesc.appendChild(pictureLikes);
        const pictureLikesImg = document.createElement("img");
        pictureLikesImg.setAttribute("src", "assets/icons/heart.svg");
        pictureLikesImg.setAttribute("alt", "Like");
        pictureLikesImg.setAttribute("class", "picture-likes-img");
        rightDesc.appendChild(pictureLikesImg);

        pictureInfos.appendChild(leftDesc);
        pictureInfos.appendChild(rightDesc);

        picture.appendChild(pictureInfos);
        media.appendChild(picture);

        return (media);
    }
    return { title, image, video, likes, date, price, getMediaDOM }
}