const blogPosts = [
    {
        title: "L'avenir des nouvelles mobilités",
        subtitle: "L’arrivée des nouvelles solutions de mobilité douces en concession",
        description: `Les Français réalisent en moyenne 181 millions de déplacements au quotidien et en tête du classement nous retrouvons sans surprise la voiture qui apparaît
                    comme notre moyen de transport préféré avec un taux d'utilisation qui se situe à 77%. Indispensable dans certaines régions, elle devient peu adaptée
                    dans des zones urbaines réglementées et proposant d'autres types de mobilités.`,
        url: "/blogs/arrivee-mobilite",
    },
    {
        title: "Limite du prêt de véhicule de courtoisie",
        subtitle: "Le véhicule de courtoisie comme « unique » moyen de transport après-vente en concession?",
        description: `Après un entretien ou une révision auto, l’automobiliste
                    une fois vous avoir déposé son véhicule en
                    concession, repartait avec un véhicule de prêt, dit
                    aussi de courtoise. À condition que celui-ci l’ait réservé
                    au préalable. Évidemment, l’offre de véhicules de
                    courtoisie disponibles en concession est limitée et un
                    système de réservation est donc nécessaire pour
                    pouvoir encadrer cette offre et cette demande. Mais
                    lorsque cette demande est supérieure à l’offre de
                    véhicules que vous pouvez prêter, vous pouvez peut-
                    être perdre un client qui a besoin impérativement d’un
                    moyen de transport pour se déplacer le temps que son
                    véhicule soit immobilisé au garage. Il pourra aller voir
                    ailleurs, trouver un autre moyen par le biais de ses
                    connaissances pour avoir un véhicule de prêt, trouver
                    un loueur, etc. Cependant, son expérience client en
                    sera impacté par le fait qu’il n’ait pas eu de solution de
                    mobilité proposée par sa concession ou quelconque
                    moyen mis en place.`,
        url: "/blogs/limite-pret-courtoisie",
    }
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