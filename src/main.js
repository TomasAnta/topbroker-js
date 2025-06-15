import getEstates from "./data.js";
import "./styles/main.scss";

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav__link");
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    links.forEach((link) => {
        const href = link.getAttribute("href").split("/").pop();
        if (href === currentPath) {
            link.classList.add("nav__link--active");
        } else {
            link.classList.remove("nav__link--active");
        }
    });
});

const loadEstates = async () => {
    try {
        const categories = document.getElementById("categories");
        if (categories) {
            categories.innerHTML = `
                <div class="category-card skeleton skeleton-card">
                    <div class="category-card__image"></div>
                    <div class="category-card__content">
                        <h2 class="category-card__title"></h2>
                        <p class="category-card__count"></p>
                        <div class="category-card__link"></div>
                    </div>
                </div>
                <div class="category-card skeleton skeleton-card">
                    <div class="category-card__image"></div>
                    <div class="category-card__content">
                        <h2 class="category-card__title"></h2>
                        <p class="category-card__count"></p>
                        <div class="category-card__link"></div>
                    </div>
                </div>
                <div class="category-card skeleton skeleton-card">
                    <div class="category-card__image"></div>
                    <div class="category-card__content">
                        <h2 class="category-card__title"></h2>
                        <p class="category-card__count"></p>
                        <div class="category-card__link"></div>
                    </div>
                </div>
            `;
        }

        const estates = await getEstates();

        const flats = estates.filter((e) => e.estate_type === "flat" && Number(e.rent_price) <= 0);
        const houses = estates.filter((e) => e.estate_type === "house");
        const sites = estates.filter((e) => e.estate_type === "site");
        const forSale = estates.filter((e) => e.for_sale);
        const forRent = estates.filter((e) => e.for_rent && Number(e.rent_price) >= 0);
        const sold = estates.filter((e) => e.record_status_id === 126);

        return {
            flats,
            houses,
            sites,
            forSale,
            forRent,
            sold,
        };
    } catch (err) {
        console.error("There was an error loading estates:", err);
        throw err;
    }
};

const renderCategoryCards = ({ flats, houses, sites }) => {
    const categories = document.getElementById("categories");

    if (!categories) return;

    categories.innerHTML = "";

    const createCategoryCard = (title, count, image, link) => `
        <div class="category-card">
            <img class="category-card__image" src="/images/${image}" alt="${title}" loading="lazy" />
            <div class="category-card__content">
                <h2 class="category-card__title">${title}</h2>
                <p class="category-card__count">${count} turto vienetai</p>
                <a href="${link}" class="category-card__link">Peržiūrėti pasiūlymus</a>
            </div>
        </div>
    `;

    categories.insertAdjacentHTML("beforeend", createCategoryCard("Butai", flats.length, "flats.jpg", "views/flats.html"));
    categories.insertAdjacentHTML("beforeend", createCategoryCard("Namai", houses.length, "house.jpg", "views/houses.html"));
    categories.insertAdjacentHTML("beforeend", createCategoryCard("Sklypai", sites.length, "site.jpg", "views/sites.html"));
};

if (document.getElementById("categories")) {
    loadEstates().then(renderCategoryCards).catch(console.error);
}

export default loadEstates;
