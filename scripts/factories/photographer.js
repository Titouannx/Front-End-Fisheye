function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const a = document.createElement( 'a' );
        a.setAttribute("href", `photographer.html?id=${data.id}`);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Photo de " + name)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute("aria-label", "Nom du photographe " + name)

        const localisation = document.createElement( 'p' );
        localisation.textContent = `${this.city}, ${this.country}`;
        localisation.id = "localisation";
        localisation.setAttribute("aria-label", "localisation du photographe " + this.city + ", " + this.country)

        const tagline = document.createElement( 'p' );
        tagline.textContent = this.tagline;
        tagline.id = "tagline";
        tagline.setAttribute("aria-label", "Mot du photographe " + this.tagline)

        const price = document.createElement( 'p' );
        price.textContent = `${this.price}€/jour`;
        price.id = "price";
        price.setAttribute("aria-label", "Tarification du photographe " + this.price + "€/jour")

        a.appendChild(img);
        a.appendChild(h2);
        
        a.appendChild(localisation);
        a.appendChild(tagline);
        a.appendChild(price);
        article.appendChild(a);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}