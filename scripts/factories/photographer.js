/* eslint-disable no-unused-vars */
function photographerFactory(data) {
    // Extract the properties from the data object
    const { name, portrait, city, country, tagline, price } = data;

    // Set the path to the photographer's portrait picture
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // Create the article element that represents the user card
        const article = document.createElement( 'article' );

        // Create the anchor element that links to the photographer's page
        const a = document.createElement( 'a' );
        a.setAttribute("href", `photographer.html?id=${data.id}`);

        // Create the image element for the photographer's portrait
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Photo de " + name)

        // Create the h2 element for the photographer's name
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute("aria-label", "Nom du photographe " + name)

        // Create the p element for the photographer's location
        const localisation = document.createElement( 'p' );
        localisation.textContent = `${this.city}, ${this.country}`;
        localisation.id = "localisation";
        localisation.setAttribute("aria-label", "localisation du photographe " + this.city + ", " + this.country)

        // Create the p element for the photographer's tagline
        const tagline = document.createElement( 'p' );
        tagline.textContent = this.tagline;
        tagline.id = "tagline";
        tagline.setAttribute("aria-label", "Mot du photographe " + this.tagline)

        // Create the p element for the photographer's price
        const price = document.createElement( 'p' );
        price.textContent = `${this.price}€/jour`;
        price.id = "price";
        price.setAttribute("aria-label", "Tarification du photographe " + this.price + "€/jour")

        // Append all the elements to the anchor and article elements
        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(localisation);
        a.appendChild(tagline);
        a.appendChild(price);
        article.appendChild(a);

        // Return the article element
        return (article);
    }
     // Return the photographer object with properties and the getUserCardDOM method
     return { name, picture, city, country, tagline, price, getUserCardDOM }
}