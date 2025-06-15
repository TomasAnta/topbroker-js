const URL = `https://app.topbroker.lt/api/v5/estates`;
const userName = import.meta.env.VITE_TOP_BROKER_USER_NAME;
const password = import.meta.env.VITE_TOP_BROKER_PASSWORD;
const authorization = btoa(`${userName}:${password}`);
const pageSize = 50;

const getEstates = async () => {
    let page = 1;
    let allEstates = [];
    let morePages = true;

    try {
        while (morePages) {
            const result = await fetch(URL, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${authorization}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    page,
                    per_page: pageSize,
                }),
            });

            const data = await result.json();
            console.log("API Status: 200");
            if (data.length === 0) {
                morePages = false;
            }
            page++;
            allEstates = allEstates.concat(data);
        }
        return allEstates;
    } catch (err) {
        console.error("There was an error fetching Estates:", err);
    }
};

export default getEstates;
