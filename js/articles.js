const categories = {
    news: "Gaming-nyheder",
    recommendations: "Find dit næste spil",
    community: "Skolens gaming",
    reviews: "Spilanmeldelser"
};

// Alle artikler placeres her
const articles = [
    {
        id: "subnautica-2",
        title: "Subnautica 2 – fedt gameplay, men hvor er historien?",
        category: "reviews",
        label: "ANMELDELSE",
        date: "11. november 2026",
        author: "Anton",
        image: "assets/images/subnautica2.jpg",
        description: "Jeg har prøvet Subnautica 2 i Early Access. Her er mine tanker om spillet indtil videre.",
        content: `
            <h2>Et nyt eventyr under vandet</h2>
            <p>
                Subnautica 2 er det nyeste spil i Subnautica-serien,
                hvor man udforsker en fremmed planet fyldt med havdyr,
                spændende steder og ting, man kan opdage.
                Jeg har selv prøvet spillet i Early Access,
                og der er allerede en del at gå i gang med.
            </p>

            <img src="assets/images/subnautica2-2.jpg"
                 alt="Subnautica 2 gameplay">

            <h2>Gameplayet er rigtig godt</h2>
            <p>
                Noget af det bedste ved spillet er gameplayet.
                Det er sjovt at udforske havet, samle materialer
                og finde nye ting. Man får lyst til at fortsætte
                med at udforske, fordi man aldrig helt ved,
                hvad man finder næste gang.
            </p>

            <h2>Der mangler lidt historie</h2>
            <p>
                Men der er også noget, jeg synes mangler.
                Jeg føler nemlig, at historien godt kunne fylde
                lidt mere. Det ville gøre det endnu mere spændende
                at spille, hvis der var mere historie at følge med i.
            </p>

            <h2>Min mening indtil videre</h2>
            <p>
                Alt i alt synes jeg, at Subnautica 2 har et rigtig
                godt gameplay, og jeg glæder mig til at se,
                hvordan spillet udvikler sig fremover.
                Jeg håber især, at der kommer mere historie,
                efterhånden som Early Access bliver opdateret.
            </p>
        `
    },

    {
        id: "minecraft",
        title: "Hvorfor spiller så mange stadig Minecraft?",
        category: "recommendations",
        label: "ANBEFALINGER",
        date: "10. november 2026",
        author: "GAMEZONE Redaktion",
        image: "assets/images/minecraft.jpg",
        description: "Et spil med næsten uendelige muligheder.",
        content: `
            <h2>Et spil uden grænser</h2>
            <p>
                Minecraft giver spillerne mulighed for at
                bygge, udforske og overleve i en verden
                bestående af blokke.
            </p>

            <h2>Hvad gør spillet specielt?</h2>
            <p>
                Spillet har mange forskellige måder at spille
                på. Man kan bygge store projekter, spille med
                venner eller udforske ukendte områder.
            </p>
        `
    }
];

// Vis artikler i en kategori
const articleList = document.getElementById("article-list");

if (articleList) {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    const title = document.getElementById("category-title");
    const empty = document.getElementById("empty-message");

    if (categories[category]) {
        title.textContent = categories[category];

        const filteredArticles = articles.filter(
            article => article.category === category
        );

        if (filteredArticles.length === 0) {
            empty.textContent = "Der er endnu ingen artikler i denne kategori.";
        }

        filteredArticles.forEach(article => {
            articleList.innerHTML += `
                <a href="article.html?id=${article.id}"
                   class="game-card category-link">

                    <img class="article-card-image"
                         src="${article.image}"
                         alt="${article.title}">

                    <div class="card-content">
                        <span class="category">${article.label}</span>
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <span class="read-more">Læs artikel →</span>
                    </div>
                </a>
            `;
        });
    } else {
        title.textContent = "Kategori ikke fundet";
        empty.textContent = "Denne kategori findes ikke.";
    }
}

// Vis en enkelt artikel
const articleContent = document.getElementById("article-content");

if (articleContent) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const article = articles.find(item => item.id === id);

    if (article) {
        document.title = article.title + " | GAMEZONE";

        document.getElementById("back-link").href =
            `category.html?category=${article.category}`;

        articleContent.innerHTML = `
            <span class="tag">${article.label}</span>
            <h1>${article.title}</h1>

            <p class="article-meta">
                ${article.author} · ${article.date}
            </p>

            <p class="article-description">
                ${article.description}
            </p>

            <img class="article-hero-image"
                 src="${article.image}"
                 alt="${article.title}">

            <div class="article-body">
                ${article.content}
            </div>
        `;
    } else {
        articleContent.innerHTML = `
            <h1>Artikel ikke fundet</h1>
            <p>Artiklen findes ikke eller er blevet fjernet.</p>
        `;
    }
}
