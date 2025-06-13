import loadEstates from "../main";

const fetchEstateDetails = async (id) => {
    const URL = `https://app.topbroker.lt/api/v5/estates/${id}`;
    const userName = import.meta.env.VITE_TOP_BROKER_USER_NAME;
    const password = import.meta.env.VITE_TOP_BROKER_PASSWORD;
    const authorization = btoa(`${userName}:${password}`);

    try {
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                Authorization: `Basic ${authorization}`,
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (err) {
        console.error("Failed to fetch estate details:", err);
    }
};

const initEstatePage = async () => {
    const loader = document.getElementById("loader");
    const detail = document.getElementById("estate-detail");

    // Show loader and skeleton
    loader.style.display = "block";
    detail.innerHTML = `
        <div class="estate-detail__card skeleton">
            <h2 class="estate-detail__card--title">Loading...</h2>
            
            <div class="estate-detail__main-image">
                <img class="estate-detail__card--image" alt="Loading">
            </div>
            
            <div class="estate-detail__gallery"></div>
            
            <div class="estate-detail__main">
                <h4 class="estate-detail__main--price"></h4>
                <p class="estate-detail__card--address"></p>
            </div>
            
            <div class="estate-detail__information">
                <p></p><p></p><p></p><p></p><p></p><p></p>
            </div>
            
            <div class="estate-detail__amenities">
                <h4></h4>
                <ul class="amenities-list">
                    <li class="amenity"></li>
                    <li class="amenity"></li>
                    <li class="amenity"></li>
                    <li class="amenity"></li>
                </ul>
            </div>
            
            <div class="estate-detail__description">
                <h4></h4>
                <div class="description-text"></div>
            </div>
        </div>
    `;

    try {
        const { flats, houses, sites } = await loadEstates();
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        const estate = await fetchEstateDetails(id);
        renderEstate(estate);
    } catch (error) {
        console.error("Error loading estate:", error);
        detail.innerHTML = `<p class="error">Failed to load property details. Please try again.</p>`;
    } finally {
        loader.style.display = "none";
    }
};

function renderEstate(estate) {
    const detail = document.getElementById("estate-detail");
    detail.innerHTML = "";

    const estateCard = document.createElement("div");
    estateCard.classList.add("estate-detail__card");

    const mainImage = estate.photos?.[0] || "";
    const galleryImages =
        estate.photos
            ?.slice(1)
            .map((img) => `<img src="${img}" alt="Galerijos nuotrauka" class="estate-detail__thumbnail">`)
            .join("") || "";

    const amenities = {
        has_alarm: "🔒 Apsaugos sistema",
        has_basement: "🏚️ Rūsys",
        has_balcony: "🌅 Balkonas",
        has_parking_place: "🚗 Parkingas",
        has_separate_entryway: "🚪 Atskiras įėjimas",
        has_packet_windows: "🪟 Plastikiniai langai",
        has_conditioning: "❄️ Kondicionierius",
        has_outdoor_terrace: "🌳 Lauko terasa",
        has_internet: "🌐 Internetas",
        has_cable_tv: "📺 Kabelinė TV",
        has_tv: "🖥️ Televizorius",
        has_washing_machine: "🧺 Skalbyklė",
        has_furniture: "🛋️ Baldai",
        has_dressing_room: "👗 Drabužinė",
        has_kitchen: "🍽️ Virtuvė",
        has_detail_plan: "📐 Detalus planas",
    };

    const filteredAmenities = Object.entries(amenities)
        .filter(([key]) => estate.flat?.[key] || estate.house?.[key])
        .map(([, label]) => `<li class="amenity">${label}</li>`)
        .join("");

    estateCard.innerHTML = `
        <h2 class="estate-detail__card--title">${estate.title}</h2>

        <div class="estate-detail__main-image">
            <img id="main-photo" src="${mainImage}" alt="${estate.title}" class="estate-detail__card--image">
        </div>

        ${galleryImages ? `<div class="estate-detail__gallery">${galleryImages}</div>` : ""}

        <div class="estate-detail__main">
            <h4 class="estate-detail__main--price">💶 ${parseInt(estate.sale_price).toLocaleString()} EUR</h4>
            <p class="estate-detail__card--address">📍 ${estate.address}</p>
        </div>

        <div class="estate-detail__information">
            <p>📐 Plotas: ${estate.area} m²</p>
            <p>🛏️ Kambariai: ${estate.room_count}</p>
            <p>🏢 Aukštas: ${estate.floor ?? "-"}</p>
            <p>🏗️ Statybos metai: ${estate.year}</p>
            <p>🛠️ Įrengimas: ${estate.furnishing || "Nenurodyta"}</p>
            <p>♻️ Tipas: ${estate.estate_type}</p>
        </div>

        ${
            filteredAmenities.length > 0
                ? `
        <div class="estate-detail__amenities">
            <h4>Patogumai:</h4>
            <ul class="amenities-list">${filteredAmenities}</ul>
        </div>`
                : ""
        }

        <div class="estate-detail__description">
            <h4>Aprašymas:</h4>
            <div class="description-text">${(estate.descriptions?.[0]?.content || "Nėra aprašymo").replace(/\n/g, "<br>")}</div>
        </div>
    `;

    detail.appendChild(estateCard);

    document.querySelectorAll(".estate-detail__thumbnail").forEach((thumb) => {
        thumb.addEventListener("click", () => {
            const main = document.getElementById("main-photo");
            if (main) main.src = thumb.src;
        });
    });
}

initEstatePage();
