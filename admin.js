// Admin Dashboard JavaScript

// Global variables
let currentSection = 'dashboard';
let games = [];
let genres = [];
let activities = [];

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to prevent flashing during initial load
    setTimeout(() => {
        try {
            initializeData();
            setupNavigation();
            loadDashboard();
            loadGames();
            loadGenres();
            loadSettings();
        } catch (error) {
            console.error('Error initializing admin dashboard:', error);
            // Show error message to user
            const errorMsg = document.createElement('div');
            errorMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #e74c3c; color: white; padding: 15px; border-radius: 5px; z-index: 9999;';
            errorMsg.innerHTML = '<strong>Error:</strong> Failed to load admin dashboard. Please refresh the page.';
            document.body.appendChild(errorMsg);
            setTimeout(() => errorMsg.remove(), 5000);
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

// Data initialization
function initializeData() {
    // Load existing data from localStorage or use defaults
    games = JSON.parse(localStorage.getItem('games')) || getDefaultGames();
    genres = JSON.parse(localStorage.getItem('genres')) || getDefaultGenres();
    activities = JSON.parse(localStorage.getItem('activities')) || [];

    // Save initial data if it doesn't exist
    if (!localStorage.getItem('games')) {
        localStorage.setItem('games', JSON.stringify(games));
    }
    if (!localStorage.getItem('genres')) {
        localStorage.setItem('genres', JSON.stringify(genres));
    }
    if (!localStorage.getItem('activities')) {
        localStorage.setItem('activities', JSON.stringify(activities));
    }
}

// Default data
function getDefaultGames() {
    return [
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
            id: 'nature-secrets',
            title: 'Nature\'s Secrets',
            genre: 'spot-difference',
            description: 'Discover hidden differences in breathtaking natural landscapes and wildlife scenes.',
            rating: 4.9,
            downloads: '25K+',
            image: 'https://via.placeholder.com/300x200/764ba2/white?text=Nature+Secrets',
            price: 'paid',
            priceAmount: '$2.99',
            status: 'published'
        },
        {
            id: 'fantasy-worlds',
            title: 'Fantasy Worlds',
            genre: 'spot-difference',
            description: 'Journey through magical fantasy realms and spot the differences in enchanted scenes.',
            rating: 4.7,
            downloads: '75K+',
            image: 'https://via.placeholder.com/300x200/667eea/white?text=Fantasy+Worlds',
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
        },
        {
            id: 'space-defense',
            title: 'Space Defense',
            genre: 'tower-defense',
            description: 'Protect your space station from alien invaders in this futuristic tower defense epic.',
            rating: 4.8,
            downloads: '45K+',
            image: 'https://via.placeholder.com/300x200/4ecdc4/white?text=Space+Defense',
            price: 'paid',
            priceAmount: '$3.99',
            status: 'published'
        }
    ];
}

function getDefaultGenres() {
    return [
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
}

// Navigation setup
function setupNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            switchSection(section);
        });
    });
}

function switchSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Update sidebar active state
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

    currentSection = sectionId;
}

// Dashboard functions
function loadDashboard() {
    updateStats();
    loadRecentActivity();
}

function updateStats() {
    const totalGames = games.length;
    const totalGenres = genres.length;
    const totalDownloads = games.reduce((sum, game) => {
        const downloads = parseInt(game.downloads.replace('K+', '')) || 0;
        return sum + downloads;
    }, 0);
    const avgRating = games.reduce((sum, game) => sum + game.rating, 0) / games.length;

    document.getElementById('total-games').textContent = totalGames;
    document.getElementById('total-genres').textContent = totalGenres;
    document.getElementById('total-downloads').textContent = totalDownloads + 'K+';
    document.getElementById('avg-rating').textContent = avgRating.toFixed(1);
}

function loadRecentActivity() {
    const activityList = document.getElementById('recent-activity');
    activityList.innerHTML = '';

    if (activities.length === 0) {
        activityList.innerHTML = '<p>No recent activity</p>';
        return;
    }

    activities.slice(0, 5).forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <i class="${activity.icon}"></i>
            <div class="activity-content">
                <div class="title">${activity.title}</div>
                <div class="description">${activity.description}</div>
            </div>
            <div class="activity-time">${activity.time}</div>
        `;
        activityList.appendChild(activityItem);
    });
}

function addActivity(title, description, icon = 'fas fa-info-circle') {
    const activity = {
        title,
        description,
        icon,
        time: new Date().toLocaleTimeString(),
        date: new Date().toISOString()
    };

    activities.unshift(activity);
    activities = activities.slice(0, 50); // Keep only last 50 activities

    localStorage.setItem('activities', JSON.stringify(activities));
    loadRecentActivity();
}

// Games management
function loadGames() {
    const tbody = document.getElementById('games-table-body');
    tbody.innerHTML = '';

    games.forEach(game => {
        const genre = genres.find(g => g.id === game.genre);
        const genreName = genre ? genre.name : 'Unknown';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="game-image-cell">
                    <img src="${game.image}" alt="${game.title}" class="game-image-thumb">
                    <div>
                        <div class="game-title">${game.title}</div>
                        <div style="font-size: 0.8rem; color: #666;">${game.id}</div>
                    </div>
                </div>
            </td>
            <td>${genreName}</td>
            <td><span class="game-rating">⭐ ${game.rating}</span></td>
            <td>${game.downloads}</td>
            <td>
                <span class="status-badge status-${game.status}">
                    ${game.status === 'published' ? 'Published' : 'Draft'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="editGame('${game.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteGame('${game.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    updateStats();
}

function showAddGameModal() {
    // Populate genre dropdown
    const genreSelect = document.getElementById('game-genre');
    genreSelect.innerHTML = '<option value="">Select Genre</option>';
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });

    // Reset form
    document.getElementById('add-game-form').reset();

    // Show modal
    document.getElementById('add-game-modal').classList.add('show');
}

function saveGame() {
    const form = document.getElementById('add-game-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Determine image source - uploaded image takes priority
    let imageUrl = document.getElementById('game-image').value;
    if (window.tempImageData) {
        imageUrl = window.tempImageData;
    } else if (!imageUrl) {
        imageUrl = 'https://via.placeholder.com/300x200/667eea/white?text=' + encodeURIComponent(document.getElementById('game-title').value);
    }

    const game = {
        id: generateId(document.getElementById('game-title').value),
        title: document.getElementById('game-title').value,
        genre: document.getElementById('game-genre').value,
        description: document.getElementById('game-description').value,
        rating: parseFloat(document.getElementById('game-rating').value),
        downloads: document.getElementById('game-downloads').value,
        image: imageUrl,
        price: document.getElementById('game-price').value,
        priceAmount: document.getElementById('game-price-amount').value,
        status: 'published'
    };

    games.push(game);
    localStorage.setItem('games', JSON.stringify(games));

    // Update genre game count
    const genre = genres.find(g => g.id === game.genre);
    if (genre) {
        genre.gameCount++;
        localStorage.setItem('genres', JSON.stringify(genres));
    }

    closeModal();
    loadGames();
    addActivity('Game Added', `${game.title} has been added to ${genre ? genre.name : 'Unknown Genre'}`, 'fas fa-plus-circle');

    // Refresh the main site if it's open in another tab
    if (window.opener) {
        window.opener.location.reload();
    }
}

function editGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    // Populate form
    document.getElementById('edit-game-id').value = game.id;
    document.getElementById('edit-game-title').value = game.title;
    document.getElementById('edit-game-description').value = game.description;
    document.getElementById('edit-game-rating').value = game.rating;
    document.getElementById('edit-game-downloads').value = game.downloads;
    document.getElementById('edit-game-image').value = game.image;
    document.getElementById('edit-game-price').value = game.price;
    document.getElementById('edit-game-price-amount').value = game.priceAmount;

    // Populate genre dropdown
    const genreSelect = document.getElementById('edit-game-genre');
    genreSelect.innerHTML = '<option value="">Select Genre</option>';
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        if (genre.id === game.genre) option.selected = true;
        genreSelect.appendChild(option);
    });

    // Show modal
    document.getElementById('edit-game-modal').classList.add('show');
}

function updateGame() {
    const form = document.getElementById('edit-game-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const gameId = document.getElementById('edit-game-id').value;
    const gameIndex = games.findIndex(g => g.id === gameId);
    if (gameIndex === -1) return;

    const oldGenre = games[gameIndex].genre;
    const newGenre = document.getElementById('edit-game-genre').value;

    // Determine image source - uploaded image takes priority
    let imageUrl = document.getElementById('edit-game-image').value;
    if (window.tempEditImageData) {
        imageUrl = window.tempEditImageData;
    } else if (!imageUrl) {
        imageUrl = games[gameIndex].image; // Keep existing image if no new one provided
    }

    games[gameIndex] = {
        ...games[gameIndex],
        title: document.getElementById('edit-game-title').value,
        genre: newGenre,
        description: document.getElementById('edit-game-description').value,
        rating: parseFloat(document.getElementById('edit-game-rating').value),
        downloads: document.getElementById('edit-game-downloads').value,
        image: imageUrl,
        price: document.getElementById('edit-game-price').value,
        priceAmount: document.getElementById('edit-game-price-amount').value
    };

    localStorage.setItem('games', JSON.stringify(games));

    // Update genre game counts
    if (oldGenre !== newGenre) {
        const oldGenreObj = genres.find(g => g.id === oldGenre);
        const newGenreObj = genres.find(g => g.id === newGenre);
        if (oldGenreObj) oldGenreObj.gameCount--;
        if (newGenreObj) newGenreObj.gameCount++;
        localStorage.setItem('genres', JSON.stringify(genres));
    }

    closeModal();
    loadGames();
    addActivity('Game Updated', `${games[gameIndex].title} has been updated`, 'fas fa-edit');

    // Refresh the main site if it's open in another tab
    if (window.opener) {
        window.opener.location.reload();
    }
}

function deleteGame(gameId) {
    if (!confirm('Are you sure you want to delete this game?')) return;

    const gameIndex = games.findIndex(g => g.id === gameId);
    if (gameIndex === -1) return;

    const game = games[gameIndex];
    const genre = genres.find(g => g.id === game.genre);

    games.splice(gameIndex, 1);
    localStorage.setItem('games', JSON.stringify(games));

    // Update genre game count
    if (genre) {
        genre.gameCount--;
        localStorage.setItem('genres', JSON.stringify(genres));
    }

    loadGames();
    addActivity('Game Deleted', `${game.title} has been deleted`, 'fas fa-trash');
}

// Genres management
function loadGenres() {
    const genresGrid = document.getElementById('genres-grid');
    genresGrid.innerHTML = '';

    genres.forEach(genre => {
        const genreCard = document.createElement('div');
        genreCard.className = 'genre-card';
        genreCard.innerHTML = `
            <div class="genre-header">
                <div class="genre-icon">
                    <i class="${genre.icon}"></i>
                </div>
                <div class="genre-info">
                    <h3>${genre.name}</h3>
                    <p>${genre.description}</p>
                </div>
            </div>
            <div class="genre-stats">
                <span class="genre-stat">${genre.gameCount} games</span>
                <div class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="editGenre('${genre.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteGenre('${genre.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        genresGrid.appendChild(genreCard);
    });

    updateStats();
}

function showAddGenreModal() {
    document.getElementById('add-genre-form').reset();
    document.getElementById('add-genre-modal').classList.add('show');
}

function saveGenre() {
    const form = document.getElementById('add-genre-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const genre = {
        id: generateId(document.getElementById('genre-name').value),
        name: document.getElementById('genre-name').value,
        description: document.getElementById('genre-description').value,
        icon: document.getElementById('genre-icon').value || 'fas fa-gamepad',
        gameCount: 0
    };

    genres.push(genre);
    localStorage.setItem('genres', JSON.stringify(genres));

    closeModal();
    loadGenres();
    addActivity('Genre Added', `${genre.name} genre has been created`, 'fas fa-plus-circle');
}

function editGenre(genreId) {
    const genre = genres.find(g => g.id === genreId);
    if (!genre) return;

    // Simple edit - just show alert for now
    const newName = prompt('Enter new genre name:', genre.name);
    if (newName && newName !== genre.name) {
        genre.name = newName;
        localStorage.setItem('genres', JSON.stringify(genres));
        loadGenres();
        addActivity('Genre Updated', `${genre.name} has been updated`, 'fas fa-edit');
    }
}

function deleteGenre(genreId) {
    const genre = genres.find(g => g.id === genreId);
    if (!genre) return;

    if (genre.gameCount > 0) {
        alert('Cannot delete genre with games. Please move or delete the games first.');
        return;
    }

    if (!confirm(`Are you sure you want to delete the "${genre.name}" genre?`)) return;

    const index = genres.findIndex(g => g.id === genreId);
    if (index !== -1) {
        genres.splice(index, 1);
        localStorage.setItem('genres', JSON.stringify(genres));
        loadGenres();
        addActivity('Genre Deleted', `${genre.name} has been deleted`, 'fas fa-trash');
    }
}

// Settings management
function loadSettings() {
    const siteTitle = localStorage.getItem('siteTitle') || 'Mobile Game Showcase';
    const siteDescription = localStorage.getItem('siteDescription') || 'Discover and play amazing mobile games across different genres';
    const primaryColor = localStorage.getItem('primaryColor') || '#667eea';
    const secondaryColor = localStorage.getItem('secondaryColor') || '#764ba2';

    document.getElementById('site-title').value = siteTitle;
    document.getElementById('site-description').value = siteDescription;
    document.getElementById('primary-color').value = primaryColor;
    document.getElementById('secondary-color').value = secondaryColor;
}

function saveSettings() {
    const siteTitle = document.getElementById('site-title').value;
    const siteDescription = document.getElementById('site-description').value;
    const primaryColor = document.getElementById('primary-color').value;
    const secondaryColor = document.getElementById('secondary-color').value;

    localStorage.setItem('siteTitle', siteTitle);
    localStorage.setItem('siteDescription', siteDescription);
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('secondaryColor', secondaryColor);

    addActivity('Settings Updated', 'Site settings have been saved', 'fas fa-cog');
    alert('Settings saved successfully!');
}

function resetSettings() {
    if (!confirm('Are you sure you want to reset all settings to default?')) return;

    localStorage.removeItem('siteTitle');
    localStorage.removeItem('siteDescription');
    localStorage.removeItem('primaryColor');
    localStorage.removeItem('secondaryColor');

    loadSettings();
    addActivity('Settings Reset', 'All settings have been reset to default', 'fas fa-undo');
}

// Utility functions
function generateId(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

// Image upload functions
function previewImage(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewImg = document.getElementById('preview-img');
            const previewDiv = document.getElementById('image-preview');

            previewImg.src = e.target.result;
            previewDiv.style.display = 'block';

            // Store the base64 data temporarily
            window.tempImageData = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function removeImage() {
    const previewDiv = document.getElementById('image-preview');
    const imageInput = document.getElementById('game-image');
    const fileInput = document.getElementById('game-image-upload');

    previewDiv.style.display = 'none';
    imageInput.value = '';
    fileInput.value = '';
    window.tempImageData = null;
}

function previewEditImage(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewImg = document.getElementById('edit-preview-img');
            const previewDiv = document.getElementById('edit-image-preview');

            previewImg.src = e.target.result;
            previewDiv.style.display = 'block';

            // Store the base64 data temporarily
            window.tempEditImageData = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function removeEditImage() {
    const previewDiv = document.getElementById('edit-image-preview');
    const imageInput = document.getElementById('edit-game-image');
    const fileInput = document.getElementById('edit-game-image-upload');

    previewDiv.style.display = 'none';
    imageInput.value = '';
    fileInput.value = '';
    window.tempEditImageData = null;
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('show');
    });

    // Clear any temporary image data
    window.tempImageData = null;
    window.tempEditImageData = null;

    // Hide image previews
    document.getElementById('image-preview').style.display = 'none';
    document.getElementById('edit-image-preview').style.display = 'none';
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // In a real application, you would clear authentication tokens
        window.location.href = 'index.html';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Data Export/Import Functions
function exportData() {
    const data = {
        games: JSON.parse(localStorage.getItem('games')) || [],
        genres: JSON.parse(localStorage.getItem('genres')) || [],
        activities: JSON.parse(localStorage.getItem('activities')) || [],
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `game-showcase-data-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    addActivity('Data exported', 'success');
    showNotification('Data exported successfully!', 'success');
}

function importData() {
    const fileInput = document.getElementById('import-file');
    const file = fileInput.files[0];

    if (!file) {
        showNotification('Please select a file to import', 'error');
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
            if (data.activities) {
                localStorage.setItem('activities', JSON.stringify(data.activities));
            }

            // Reload data and refresh UI
            games = data.games || [];
            genres = data.genres || [];
            activities = data.activities || [];

            loadDashboard();
            loadGames();
            loadGenres();

            addActivity('Data imported', 'success');
            showNotification('Data imported successfully!', 'success');

            // Clear file input
            fileInput.value = '';

        } catch (error) {
            console.error('Import error:', error);
            showNotification('Error importing data. Please check the file format.', 'error');
        }
    };
    reader.readAsText(file);
}

function clearAllData() {
    if (confirm('Are you sure you want to clear ALL data? This cannot be undone!')) {
        localStorage.removeItem('games');
        localStorage.removeItem('genres');
        localStorage.removeItem('activities');

        // Reset to defaults
        games = getDefaultGames();
        genres = getDefaultGenres();
        activities = [];

        // Save defaults
        localStorage.setItem('games', JSON.stringify(games));
        localStorage.setItem('genres', JSON.stringify(genres));
        localStorage.setItem('activities', JSON.stringify(activities));

        // Refresh UI
        loadDashboard();
        loadGames();
        loadGenres();

        addActivity('All data cleared', 'warning');
        showNotification('All data cleared and reset to defaults', 'warning');
    }
}

function showDataExport() {
    // Show the data export section
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('data-export').classList.add('active');

    // Update sidebar active state
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('[data-section="data-export"]').classList.add('active');

    // Update data counts
    updateDataCounts();
}

function updateDataCounts() {
    const games = JSON.parse(localStorage.getItem('games')) || [];
    const genres = JSON.parse(localStorage.getItem('genres')) || [];
    const activities = JSON.parse(localStorage.getItem('activities')) || [];

    document.getElementById('export-games-count').textContent = games.length;
    document.getElementById('export-genres-count').textContent = genres.length;
    document.getElementById('export-activities-count').textContent = activities.length;
}

// Add click handler for data export link in existing DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code is already there ...

    // Add click handler for data export link
    const dataExportLink = document.querySelector('[data-section="data-export"]');
    if (dataExportLink) {
        dataExportLink.addEventListener('click', function(e) {
            e.preventDefault();
            showDataExport();
        });
    }
});

// Initialize on page load
window.addEventListener('load', function() {
    // Additional initialization if needed
    updateDataCounts();
});
