import loadEstates from "../main.js";

const renderHouseCards = (houses, sold) => {
    const list = document.getElementById("houses-list");
    if (!list) return;

    const skeleton = document.querySelector(".houses-skeleton-container");
    if (skeleton) skeleton.remove();

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
                    <span class="estate-card__meta-item">📐 Plotas: ${house.area} m²</span>
                    <span class="estate-card__meta-item">🛏️ Kambariai: ${house.room_count} </span>
                </div>
                <div class="estate-card__meta">
                    <span class="estate-card__meta-item">📍Vieta: ${house.city.name}</span>
                </div>
                <a class="estate-card__link" href="estate.html?id=${house.id}">Peržiūrėti →</a>
            </div>
        `;

        list.appendChild(houseCard);
    });
};

if (document.getElementById("houses-list")) {
    const list = document.getElementById("houses-list");
    list.innerHTML = `
       <div class="estate-grid">
        ${Array(6)
            .fill(
                `
          <div class="estate-card skeleton">
            <div class="estate-card__image"></div>
            <div class="estate-card__content">
              <div class="estate-card__price"></div>
              <div class="estate-card__title"></div>
              <div class="estate-card__meta">
                <span class="estate-card__meta-item"></span>
                <span class="estate-card__meta-item"></span>
                <span class="estate-card__meta-item"></span>
              </div>
              <a class="estate-card__link"></a>
            </div>
          </div>
        `
            )
            .join("")}
      </div>
    `;

    loadEstates()
        .then(({ houses, sold }) => renderHouseCards(houses, sold))
        .catch(console.error);
}
