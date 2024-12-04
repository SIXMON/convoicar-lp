const blogPosts = [
    {
        title: "L'avenir des nouvelles mobilités",
        subtitle: "L’arrivée des nouvelles solutions de mobilité douces en concession",
        description: `Les Français réalisent en moyenne 181 millions de déplacements au quotidien et en tête du classement nous retrouvons sans surprise la voiture qui apparaît
                    comme notre moyen de transport préféré avec un taux d'utilisation qui se situe à 77%. Indispensable dans certaines régions, elle devient peu adaptée
                    dans des zones urbaines réglementées et proposant d'autres types de mobilités.`,
        url: "/blogs/arrivee-mobilite",
    },
];

function createBlogCard(post) {
    return `
        <div class="col-12 mb-4">
            <div class="card h-100">
                <div class="card-body">
                    <h2 class="card-title text-primary">${post.title}</h2>
                    <p class="card-subtitle bold">${post.subtitle}</p>
                    <p class="card-text text-muted">${post.description}</p>
                    <div class="text-right">
                        <a href="${post.url}" class="btn link-btn text-12">Lire la suite</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fonction pour afficher tous les articles
function displayAllPosts() {
    const resultsContainer = document.getElementById('searchResults');
    const html = blogPosts.map(post => createBlogCard(post)).join('');
    resultsContainer.innerHTML = html;
}

// Fonction de recherche
function searchBlog() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    
    const filteredPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.description.toLowerCase().includes(searchTerm)
    );
    
    const html = filteredPosts.map(post => createBlogCard(post)).join('');
    resultsContainer.innerHTML = html || '<div class="col-12 text-center">Aucun résultat trouvé</div>';
}

// Écouteur d'événements pour la recherche en temps réel
document.getElementById('searchInput').addEventListener('input', searchBlog);

// Afficher tous les articles au chargement
document.addEventListener('DOMContentLoaded', displayAllPosts);