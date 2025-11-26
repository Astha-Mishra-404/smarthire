

let currentFreelancer; // Global variable to hold the freelancer object

// Utility function to get URL parameter
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * Helper function to generate Font Awesome star HTML.
 * @param {number} rating - The numerical rating.
 * @returns {string} HTML string of full and half stars.
 */
function generateStarHTML(rating) {
    let html = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full Stars
    for (let i = 0; i < fullStars; i++) {
        html += '<i class="fas fa-star" style="color: gold;"></i>';
    }
    // Half Star
    if (hasHalfStar) {
        html += '<i class="fas fa-star-half-alt" style="color: gold;"></i>';
    }
    // Empty stars to total 5
    const totalStars = fullStars + (hasHalfStar ? 1 : 0);
    const emptyStars = 5 - totalStars;
    for (let i = 0; i < emptyStars; i++) {
        html += '<i class="far fa-star" style="color: gold;"></i>'; // Font Awesome regular (empty) star
    }

    return html;
}

// Function to render the profile
function renderProfile() {
    const profileId = getUrlParam('id');
    
    // Safety check for allFreelancers from freelancers.js
    if (typeof allFreelancers === 'undefined' || !Array.isArray(allFreelancers)) {
        document.getElementById('profile-details').innerHTML = '<div style="text-align:center;"><h2>Data Loading Error</h2><p>Freelancer data could not be loaded. Ensure freelancers.js is included first.</p></div>';
        return;
    }

    const freelancer = allFreelancers.find(f => f.id === profileId);
    currentFreelancer = freelancer; // Save to global variable
    const profileDetails = document.getElementById('profile-details');

    if (!freelancer) {
        profileDetails.innerHTML = '<div style="text-align:center;"><h2>Profile Not Found!</h2><p>The requested freelancer profile could not be loaded.</p><a href="freelancers.html" class="btn-primary" style="text-decoration:none; display:inline-block; margin-top:20px;">Back to Discovery</a></div>';
        return;
    }

    // Dynamic details
    const experience = profileId === '99' ? 'New Member' : '5+ Years';
    const portfolio = profileId === '99' ? 'N/A (Link Coming Soon)' : 'https://www.portfolio.com/' + freelancer.name.toLowerCase().replace(' ', '-');
    const email = freelancer.name.toLowerCase().replace(' ', '.') + '@smarthire.com';
    const address = profileId === '99' ? 'Global' : 'San Francisco, CA';
    const hourlyRate = profileId === '99' ? 'Negotiable' : '$50/hr';

    const starHtml = generateStarHTML(freelancer.rating); 

    profileDetails.innerHTML = `
        <div class="profile-header">
            <img src="${freelancer.img}" alt="${freelancer.name}" />
            <h1>${freelancer.name}</h1>
            <p class="profile-skill">${freelancer.skill} Specialist</p>
            <div class="rating">${starHtml} (${freelancer.rating} Reviews)</div>
        </div>
        
        <div class="profile-bio">
            <p><strong>Bio:</strong> ${freelancer.bio} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>

        <div class="profile-details">
            <div class="detail-item">
                <i class="fas fa-envelope"></i>
                <strong>Email:</strong> <span>${email}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-briefcase"></i>
                <strong>Experience:</strong> <span>${experience}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-earth-americas"></i>
                <strong>Location:</strong> <span>${address}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-link"></i>
                <strong>Portfolio:</strong> <a href="${portfolio}" target="_blank">${portfolio}</a>
            </div>
            <div class="detail-item">
                <i class="fas fa-hand-holding-dollar"></i>
                <strong>Rate:</strong> <span>${hourlyRate}</span>
            </div>
        </div>
    `;
    
    // Attach event listeners to the action buttons after the profile is loaded
    attachButtonListeners();

    // Initialize ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.profile-card', { distance: '40px', duration: 1000, easing: 'ease-out', origin: 'bottom' });
    }
}

// --- NEW INTERACTIVITY FUNCTIONS ---

function attachButtonListeners() {
    const bookBtn = document.getElementById('book-now-btn');
    const msgBtn = document.getElementById('message-btn');

    if (bookBtn && currentFreelancer) {
        bookBtn.addEventListener('click', () => {
            openBookAlert(currentFreelancer.name);
        });
    }

    if (msgBtn && currentFreelancer) {
        msgBtn.addEventListener('click', () => {
            openMessageModal(currentFreelancer.name, currentFreelancer.skill);
        });
    }
}

// Function to open the 3D Pop-up Alert
function openBookAlert(freelancerName) {
    const nameElement = document.getElementById('alert-freelancer-name');
    if (nameElement) nameElement.textContent = freelancerName;

    const alertBox = document.getElementById('email-alert');
    if (alertBox) {
        alertBox.style.display = 'block';
        setTimeout(() => {
            alertBox.classList.add('active');
        }, 10);
    }
}

// Function to close the 3D Pop-up Alert
function closePopupAlert() {
    const alertBox = document.getElementById('email-alert');
    if (alertBox) {
        alertBox.classList.remove('active');
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 600); // Matches the 0.6s transition time
    }
}

// Function to open the Message Dialog Box (Modal)
function openMessageModal(freelancerName, freelancerSkill) {
    const modalName = document.getElementById('modal-freelancer-name');
    const modalSkill = document.getElementById('modal-freelancer-skill');
    
    if (modalName) modalName.textContent = freelancerName;
    if (modalSkill) modalSkill.textContent = freelancerSkill;

    const messageTextarea = document.getElementById('message-text');
    if (messageTextarea) messageTextarea.value = ''; // Clear previous message
    
    const modal = document.getElementById('message-modal');
    if (modal) modal.style.display = 'block';
}

// Function to close any Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

// Function to handle sending the message (Simulated)
function sendMessage(event) {
    event.preventDefault();
    const message = document.getElementById('message-text').value;
    const freelancerName = document.getElementById('modal-freelancer-name').textContent;
    
    if (message.trim() !== '') {
        alert(`Message successfully sent to ${freelancerName}! Message snippet: "${message.substring(0, 30)}..."`);
        closeModal('message-modal');
    }
}


// Global utilities and initialization
document.addEventListener('DOMContentLoaded', () => {
    // Ensure the new utility functions are globally accessible (optional, but good practice for event handlers)
    window.closePopupAlert = closePopupAlert;
    window.closeModal = closeModal;
    window.sendMessage = sendMessage;
    
    renderProfile();
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const messageModal = document.getElementById('message-modal');
        if (event.target === messageModal) {
            closeModal('message-modal');
        }
    }
});
