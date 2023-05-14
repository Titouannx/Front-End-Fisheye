/* eslint-disable no-undef */
    async function getPhotographers() {
        // fetch data/photographers.json in a photographers variable
        let photographers = await fetch("data/photographers.json")
            .then((response) => response.json())
            .then((data) => data.photographers);
        // return photographers
        
        return { photographers };
    }

    // display the data of each photographer in the DOM
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
