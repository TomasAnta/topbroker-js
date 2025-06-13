import loadEstates from "../main.js";

const renderHouseCards = (houses, sold) => {
    const list = document.getElementById("houses-list");
    if (!list) return;

    list.innerHTML = "";

    const soldIds = sold.map((h) => h.id);
    const availableHouses = houses.filter((h) => h.for_sale && !soldIds.includes(h.id));

    availableHouses.forEach((house) => {
        const houseCard = document.createElement("div");
        houseCard.classList.add("estate-card");

        houseCard.innerHTML = `
            <img class="estate-card__image" src="${house.primary_photo}" alt="${house.title}" />
            <div class="estate-card__content">
                <div class="estate-card__price">${parseInt(house.sale_price).toLocaleString()} EUR</div>
                <div class="estate-card__title">${house.title}</div>
                <div class="estate-card__meta">
                    <span class="estate-card__meta-item">📐 ${house.area} m²</span>
                    <span class="estate-card__meta-item">🛏️ ${house.room_count} kamb.</span>
                    <span class="estate-card__meta-item">🏢 ${house.floor ?? "-"} aukštas</span>
                </div>
                <div class="estate-card__meta">
                    <span class="estate-card__meta-item">🛠️ Įrengimas: ${house.furnishing || "Nenurodyta"}</span>
                </div>
                <a class="estate-card__link" href="estate.html?id=${house.id}">Peržiūrėti →</a>
            </div>
        `;

        list.appendChild(houseCard);
    });
};

loadEstates()
    .then(({ houses, sold }) => renderHouseCards(houses, sold))
    .catch(console.error);
