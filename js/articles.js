
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
        title: "Subnautica 2 – tilbage til det ukendte",
        category: "news",
        label: "GAMING-NYHEDER",
        date: "10. november 2026",
        author: "GAMEZONE Redaktion",
        image: "assets/images/subnautica2.jpg",
        description: "Et nyt eventyr venter under havets overflade.",
        content: `
            <h2>En ny verden under vandet</h2>
            <p>
                Subnautica 2 er efterfølgeren til det populære
                overlevelsesspil Subnautica. Spillet tager
                spillerne med til en ny fremmed verden.
            </p>

            <img src="assets/images/subnautica2-2.jpg"
                 alt="Subnautica 2 gameplay">

            <h2>Overlevelse og udforskning</h2>
            <p>
                Ligesom i det første spil handler det om at
                samle ressourcer, bygge baser og udforske
                havet. Men man skal også passe på de væsner,
                der gemmer sig under overfladen.
            </p>

            <h2>Kan det leve op til forventningerne?</h2>
            <p>
                Mange fans glæder sig til at opleve den nye
                verden. Det bliver spændende at se, om spillet
                kan leve op til forgængerens succes.
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