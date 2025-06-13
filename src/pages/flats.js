import loadEstates from "../main.js";

const renderFlatCards = (flats) => {
    const list = document.getElementById("flats-list");
    if (!list) return;

    // Remove skeleton first
    const skeleton = document.querySelector(".flats-skeleton-container");
    if (skeleton) skeleton.remove();

    list.innerHTML = "";

    flats.forEach((flat) => {
        const flatCard = document.createElement("div");
        flatCard.classList.add("estate-card");

        flatCard.innerHTML = `
            <img class="estate-card__image" src="${flat.primary_photo}" alt="${flat.title}" />
            <div class="estate-card__content">
                <div class="estate-card__price">${parseInt(flat.sale_price).toLocaleString()} EUR</div>
                <div class="estate-card__title">${flat.title}</div>
                <div class="estate-card__meta">
                    <span class="estate-card__meta-item">📐 ${flat.area} m²</span>
                    <span class="estate-card__meta-item">🛏️ ${flat.room_count} kamb.</span>
                    <span class="estate-card__meta-item">🏢 ${flat.floor ?? "-"} aukštas</span>
                </div>
                <div class="estate-card__meta">
                    <span class="estate-card__meta-item">🛠️ Įrengimas: ${flat.furnishing || "Nenurodyta"}</span>
                </div>
                <a class="estate-card__link" href="estate.html?id=${flat.id}">Peržiūrėti →</a>
            </div>
        `;

        list.appendChild(flatCard);
    });
};

if (document.getElementById("flats-list")) {
    const list = document.getElementById("flats-list");

    // Create skeleton (6 placeholder cards)
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
        .then(({ flats }) => renderFlatCards(flats))
        .catch(console.error);
}
