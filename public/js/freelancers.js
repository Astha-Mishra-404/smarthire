// freelancers.js (COMPLETE CODE - FIXED)

// 1. Expanded Fake Freelancer Data
const allFreelancers = [
    { id: '1', name: 'Alice Johnson', skill: 'Web Development', rating: 4.9, bio: 'Expert in React, Node.js, and modern full-stack development.', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop', profile: 'profile.html?id=1' },
    { id: '2', name: 'Mark Chen', skill: 'Graphic Design', rating: 4.8, bio: 'Branding and UI/UX specialist with 8 years of experience.', img: 'https://images.unsplash.com/photo-1507003211169-0a814d56c072?w=80&h=80&fit=crop', profile: 'profile.html?id=2' },
    { id: '3', name: 'Sarah Lee', skill: 'Digital Marketing', rating: 4.7, bio: 'SEO, Content Strategy, and Social Media campaigns.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?w=80&h=80&fit=crop', profile: 'profile.html?id=3' },
    { id: '4', name: 'David Smith', skill: 'Video Editing', rating: 4.6, bio: 'Professional video editor for corporate and social media content.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop', profile: 'profile.html?id=4' },
    { id: '5', name: 'Emily White', skill: 'Copywriting', rating: 5.0, bio: 'High-converting copy for landing pages and email sequences.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop', profile: 'profile.html?id=5' },
    { id: '6', name: 'Robert Grey', skill: 'Data Science', rating: 4.5, bio: 'Machine Learning models and big data analysis using Python/R.', img: 'https://images.unsplash.com/photo-1506794778202-dfa7995166db?w=80&h=80&fit=crop', profile: 'profile.html?id=6' },
    { id: '7', name: 'Jessica Alba', skill: 'Mobile App Dev', rating: 4.9, bio: 'Specialist in native iOS and Android development (Swift/Kotlin).', img: 'https://images.unsplash.com/photo-1542157404-5170d10d939a?w=80&h=80&fit=crop', profile: 'profile.html?id=7' },
    { id: '8', name: 'Kevin Brown', skill: 'Cloud Architecture', rating: 4.7, bio: 'AWS and Azure infrastructure planning and deployment.', img: 'https://images.unsplash.com/photo-1557007050-711e1f1807e1?w=80&h=80&fit=crop', profile: 'profile.html?id=8' },
    { id: '9', name: 'Olivia Perez', skill: 'Financial Consulting', rating: 4.8, bio: 'Budgeting, financial planning, and business valuation.', img: 'https://images.unsplash.com/photo-1546747167-e17f91752b07?w=80&h=80&fit=crop', profile: 'profile.html?id=9' },
    { id: '10', name: 'Ethan Jones', skill: 'Technical Writing', rating: 4.5, bio: 'Documentation, white papers, and user guides for SaaS products.', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop', profile: 'profile.html?id=10' },
    // Placeholder for new user registration
    { id: '99', name: 'New Freelancer', skill: 'New Skills', rating: 0.0, bio: 'Your profile will appear here after registration!', img: 'https://images.unsplash.com/photo-1596495578044-245388c2f1f5?w=80&h=80&fit=crop', profile: 'profile.html?id=99' },
];

// 2. Pagination State Variables
let currentPage = 1;
const itemsPerPage = 3; // Display 3 users initially and per page
let filteredFreelancers = allFreelancers;

// 3. DOM Rendering Function
function renderFreelancers(data) {
    const grid = document.getElementById('freelancers-grid');
    grid.innerHTML = ''; // Clear existing content

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const freelancersToDisplay = data.slice(start, end);

    // Update Pagination Info
    document.getElementById('page-info').textContent = `Page ${totalPages > 0 ? currentPage : 0} of ${totalPages}`;
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages || totalPages === 0;

    if (freelancersToDisplay.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column: 1 / -1; font-size:1.2rem; color:#888;">No freelancers found matching your search criteria.</p>';
        return;
    }

    freelancersToDisplay.forEach(freelancer => {
        const card = document.createElement('a');
        card.classList.add('freelancer-card');
        card.setAttribute('href', freelancer.profile); // Link to profile page
        card.setAttribute('data-sr', ''); // For ScrollReveal

        // --- FIX APPLIED HERE: Use Font Awesome Star Icon ---
        const fullStars = Math.floor(freelancer.rating);
        const hasHalfStar = (freelancer.rating % 1) >= 0.5;
        let starsHTML = '';

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star" style="color: gold;"></i>';
        }
        // Add half star
        if (hasHalfStar && fullStars < 5) {
            starsHTML += '<i class="fas fa-star-half-alt" style="color: gold;"></i>';
        }
        // Add empty stars (to complete 5 total)
        const totalStars = fullStars + (hasHalfStar ? 1 : 0);
        for (let i = totalStars; i < 5; i++) {
            starsHTML += '<i class="far fa-star" style="color: gold;"></i>';
        }
        // ---------------------------------------------------
        
        card.innerHTML = `
            <img src="${freelancer.img}" alt="${freelancer.name}" class="profile-pic" />
            <h4>${freelancer.name}</h4>
            <p>${freelancer.bio}</p>
            <div class="rating">${starsHTML} (${freelancer.rating})</div>
            <span class="skills-tag"><i class="fas fa-briefcase"></i> ${freelancer.skill}</span>
        `;
        grid.appendChild(card);
    });
    
    // Re-initialize ScrollReveal after new elements are added
    ScrollReveal().reveal('[data-sr]', { distance: '40px', duration: 900, easing: 'ease-out', interval: 150, origin: 'bottom' });
}

// 4. Search/Filter Function (Globally accessible from HTML)
window.filterFreelancers = function() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    filteredFreelancers = allFreelancers.filter(f => 
        f.name.toLowerCase().includes(searchTerm) || 
        f.skill.toLowerCase().includes(searchTerm) ||
        f.bio.toLowerCase().includes(searchTerm)
    );
    
    // Reset to page 1 after filtering
    currentPage = 1; 
    renderFreelancers(filteredFreelancers);
}

// 5. Pagination Control Function (Globally accessible from HTML)
window.changePage = function(direction) {
    const totalPages = Math.ceil(filteredFreelancers.length / itemsPerPage);
    const newPage = currentPage + direction;

    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderFreelancers(filteredFreelancers);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    }
}

// 6. Initial Load & Utilities
document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderFreelancers(filteredFreelancers);
    
    // Progress Bar
    window.addEventListener('scroll', () => {
        const st = window.scrollY;
        const dh = document.body.scrollHeight - window.innerHeight;
        document.getElementById('progress-bar').style.width = (st/dh)*100 + '%';
    });
    
    // Dark Mode Toggle
    const darkToggle = document.querySelector('.dark-toggle');
    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Ensure navbar also gets dark-mode class for consistent styling
        const navbar = document.querySelector('#navbar');
        if (navbar) navbar.classList.toggle('dark-mode');
        
        darkToggle.textContent = document.body.classList.contains('dark-mode') ? "Light Mode" : "Dark Mode";
    });
});
