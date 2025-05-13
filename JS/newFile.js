// script.js

// Get all elements with the "highlight-hover" class
const hoverElements = document.querySelectorAll('.highlight-hover');

// Add a hover effect using JavaScript
hoverElements.forEach((element) => {
    // Store the original text color
    const originalColor = window.getComputedStyle(element).color;

    element.addEventListener('mouseover', () => {
        element.style.textShadow = '0 0 5px rgba(253, 253, 253, 0.959)';
        element.style.border = '1px solid #c7370a';
        element.style.padding = '2px';
        element.style.transition = 'text-shadow 0.3s ease';
        // Do NOT set the color here, to maintain the original color
    });

    element.addEventListener('mouseout', () => {
        element.style.color = originalColor; // Restore original text color
        element.style.textShadow = ''; // Reset text shadow
        element.style.border = ''; // Reset border
        element.style.padding = ''; // Reset padding
        element.style.transition = ''; // Reset transition
    });
});
