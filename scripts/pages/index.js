    async function getPhotographers() {
        // fetch data/photographers.json in a photographers variable
        let photographers = await fetch("data/photographers.json")
            .then((response) => response.json())
            .then((data) => data.photographers);
        // return photographers
        
        return { photographers };
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
            console.log(photographerFactory(photographer))
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
