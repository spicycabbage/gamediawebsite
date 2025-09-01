// Mobile Navigation Toggle (for future mobile menu)
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add active state to dropdown menu items
    const currentPage = window.location.pathname.split('/').pop();
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Add loading animation for game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add click tracking for buttons (for analytics)
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real application, you would send this to analytics
            console.log('Button clicked:', this.textContent.trim());
        });
    });

    // Add image lazy loading effect
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        // Set initial opacity to 0 for fade-in effect
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
});

// Function to handle game filtering (for future use)
function filterGames(genre) {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        if (genre === 'all' || card.dataset.genre === genre) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function to handle search (for future search functionality)
function searchGames(query) {
    const gameCards = document.querySelectorAll('.game-card');
    const searchTerm = query.toLowerCase();

    gameCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Load games from localStorage or use defaults
function loadGamesFromStorage() {
    const storedGames = localStorage.getItem('games');
    if (storedGames) {
        return JSON.parse(storedGames);
    }

    // Default games if no stored data
    const defaultGames = [
        {
            id: 'urban-explorer',
            title: 'Urban Explorer',
            genre: 'spot-difference',
            description: 'Explore beautiful cityscapes and find the differences in stunning urban environments.',
            rating: 4.8,
            downloads: '50K+',
            image: 'https://via.placeholder.com/300x200/667eea/white?text=Urban+Explorer',
            price: 'free',
            priceAmount: '',
            status: 'published'
        },
        {
            id: 'castle-siege',
            title: 'Castle Siege',
            genre: 'tower-defense',
            description: 'Defend your medieval castle from waves of enemy attackers with strategic tower placement.',
            rating: 4.6,
            downloads: '100K+',
            image: 'https://via.placeholder.com/300x200/ff6b6b/white?text=Castle+Siege',
            price: 'free',
            priceAmount: '',
            status: 'published'
        }
    ];

    localStorage.setItem('games', JSON.stringify(defaultGames));
    return defaultGames;
}

// Load genres from localStorage or use defaults
function loadGenresFromStorage() {
    const storedGenres = localStorage.getItem('genres');
    if (storedGenres) {
        return JSON.parse(storedGenres);
    }

    const defaultGenres = [
        {
            id: 'spot-difference',
            name: 'Spot The Difference',
            description: 'Challenge your observation skills with spot the difference games',
            icon: 'fas fa-eye',
            gameCount: 3
        },
        {
            id: 'tower-defense',
            name: 'Tower Defense',
            description: 'Strategic tower defense games that will test your tactical skills',
            icon: 'fas fa-shield-alt',
            gameCount: 2
        }
    ];

    localStorage.setItem('genres', JSON.stringify(defaultGenres));
    return defaultGenres;
}

// Display featured games on homepage
function displayFeaturedGames() {
    const games = loadGamesFromStorage();
    const featuredGrid = document.getElementById('featured-games-grid');

    if (!featuredGrid) return;

    // Get published games only
    const publishedGames = games.filter(game => game.status === 'published');

    // Display first 6 games or all if less than 6
    const featuredGames = publishedGames.slice(0, 6);

    featuredGrid.innerHTML = '';

    if (featuredGames.length === 0) {
        featuredGrid.innerHTML = '<p>No games available yet.</p>';
        return;
    }

    featuredGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-image">
                <img src="${game.image}" alt="${game.title}" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200/667eea/white?text=${encodeURIComponent(game.title)}'">
                <div class="game-badge">${game.price === 'free' ? 'Free' : game.priceAmount}</div>
            </div>
            <div class="game-info">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <div class="game-meta">
                    <span class="rating">⭐ ${game.rating}</span>
                    <span class="downloads">${game.downloads}</span>
                </div>
                <div class="game-actions">
                    <a href="game-${game.id}.html" class="btn-primary">View Details</a>
                    <button class="btn-secondary">${game.price === 'free' ? 'Download' : game.priceAmount}</button>
                </div>
            </div>
        `;
        featuredGrid.appendChild(gameCard);
    });
}

// Update genre counts in navigation
function updateGenreCounts() {
    const games = loadGamesFromStorage();
    const genres = loadGenresFromStorage();

    // Update genre counts
    genres.forEach(genre => {
        const gameCount = games.filter(game => game.genre === genre.id && game.status === 'published').length;
        genre.gameCount = gameCount;
    });

    localStorage.setItem('genres', JSON.stringify(genres));

    // Update genre cards on homepage
    const genreCards = document.querySelectorAll('.genre-card[data-genre]');
    genreCards.forEach(card => {
        const genreId = card.getAttribute('data-genre');
        const genre = genres.find(g => g.id === genreId);
        if (genre) {
            const countSpan = card.querySelector('.game-count');
            if (countSpan) {
                const count = genre.gameCount || 0;
                const gameText = count === 1 ? 'Game' : 'Games';
                countSpan.textContent = `${count} ${gameText}`;
            }
        }
    });
}

// Display games for a specific genre
function displayGenreGames(genreId, containerId) {
    const games = loadGamesFromStorage();
    const container = document.getElementById(containerId);

    if (!container) return;

    // Filter games by genre and published status
    const genreGames = games.filter(game => game.genre === genreId && game.status === 'published');

    container.innerHTML = '';

    if (genreGames.length === 0) {
        container.innerHTML = '<p>No games available in this genre yet.</p>';
        return;
    }

    genreGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-image">
                <img src="${game.image}" alt="${game.title}" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200/667eea/white?text=${encodeURIComponent(game.title)}'">
                <div class="game-badge">${game.price === 'free' ? 'Free' : game.priceAmount}</div>
            </div>
            <div class="game-info">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <div class="game-meta">
                    <span class="rating">⭐ ${game.rating}</span>
                    <span class="downloads">${game.downloads}</span>
                </div>
                <div class="game-actions">
                    <a href="game-${game.id}.html" class="btn-primary">View Details</a>
                    <button class="btn-secondary">${game.price === 'free' ? 'Download' : game.priceAmount}</button>
                </div>
            </div>
        `;
        container.appendChild(gameCard);
    });
}

// Initialize dynamic content on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to prevent flashing during initial load
    setTimeout(() => {
        try {
            // Homepage functions
            if (document.getElementById('featured-games-grid')) {
                displayFeaturedGames();
                updateGenreCounts();
            }

            // Genre page functions
            if (document.getElementById('spot-difference-games-container')) {
                displayGenreGames('spot-difference', 'spot-difference-games-container');
            }

            if (document.getElementById('tower-defense-games-container')) {
                displayGenreGames('tower-defense', 'tower-defense-games-container');
            }
        } catch (error) {
            console.warn('Error loading dynamic content:', error);
            // Continue with static content if dynamic loading fails
        }

        // Remove FOUC after content is loaded
        setTimeout(() => {
            document.documentElement.classList.add('loaded');
        }, 50);
    }, 100);
});

// Prevent FOUC on window load
window.addEventListener('load', function() {
    setTimeout(() => {
        document.documentElement.classList.add('loaded');
    }, 100);
});

// Import Modal Functions
function showImportModal() {
    const modal = document.getElementById('import-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeImportModal() {
    const modal = document.getElementById('import-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    // Clear file input
    const fileInput = document.getElementById('homepage-import-file');
    if (fileInput) {
        fileInput.value = '';
    }
}

function importGameData() {
    const fileInput = document.getElementById('homepage-import-file');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to import');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);

            if (data.games) {
                localStorage.setItem('games', JSON.stringify(data.games));
            }
            if (data.genres) {
                localStorage.setItem('genres', JSON.stringify(data.genres));
            }

            // Reload the page to show new data
            alert('Data imported successfully! Refreshing page...');
            window.location.reload();

        } catch (error) {
            console.error('Import error:', error);
            alert('Error importing data. Please check the file format.');
        }
    };
    reader.readAsText(file);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('import-modal');
    if (e.target === modal) {
        closeImportModal();
    }
});

// Export functions for global use
window.GameShowcase = {
    loadGamesFromStorage,
    loadGenresFromStorage,
    displayFeaturedGames,
    updateGenreCounts,
    filterGames,
    searchGames,
    showImportModal,
    closeImportModal,
    importGameData
};
