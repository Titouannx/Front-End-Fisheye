function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const a = document.createElement( 'a' );
        a.setAttribute("href", `photographer.html?id=${data.id}`);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const localisation = document.createElement( 'p' );
        localisation.textContent = `${this.city}, ${this.country}`;
        localisation.id = "localisation";

        const tagline = document.createElement( 'p' );
        tagline.textContent = this.tagline;
        tagline.id = "tagline";

        const price = document.createElement( 'p' );
        price.textContent = `${this.price}€/jour`;
        price.id = "price";

        a.appendChild(img);
        a.appendChild(h2);
        
        article.appendChild(a);
        article.appendChild(localisation);
        article.appendChild(tagline);
        article.appendChild(price);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}