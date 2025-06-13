import loadEstates from "../main.js";

const renderSiteCards = (sites) => {
    const list = document.getElementById("sites-list");
    if (!list) return;

    list.innerHTML = "";

    sites.forEach((site) => {
        const siteCard = document.createElement("div");
        siteCard.classList.add("estate-card");

        siteCard.innerHTML = `
            <img class="estate-card__image" src="${site.primary_photo}" alt="${site.title}" />
            <div class="estate-card__content">
                <div class="estate-card__price">${parseInt(site.sale_price).toLocaleString()} EUR</div>
                <div class="estate-card__title">${site.title}</div>
                <div class="estate-card__meta">
                    <span class="estate-card__meta-item">📐 ${site.area} m²</span>
                    <span class="estate-card__meta-item">📍 ${site.city || "Nenurodyta"}</span>
                </div>
                <a class="estate-card__link" href="estate.html?id=${site.id}">Peržiūrėti →</a>
            </div>
        `;

        list.appendChild(siteCard);
    });
};

loadEstates()
    .then(({ sites }) => renderSiteCards(sites))
    .catch(console.error);
