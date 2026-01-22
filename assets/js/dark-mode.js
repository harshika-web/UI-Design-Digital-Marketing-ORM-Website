/**
 * Dark Mode Toggle Logic
 * Handles switching between light and dark themes, persisting preference,
 * and injecting the toggle button into the DOM.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Default to light mode as per requirement, unless user explicitly saved 'dark' 
    // OR if we want to respect system preference (optional, but good UX). 
    // User asked for "Default theme should be light mode".
    // So we only enable dark mode if explicitly saved as 'dark'.
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // 2. Inject the Toggle Button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.ariaLabel = 'Toggle Dark Mode';
    toggleBtn.innerHTML = `
    <span class="sun-icon">🌞</span>
    <span class="moon-icon">🌙</span>
  `;
    document.body.appendChild(toggleBtn);

    // 3. Toggle Logic
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // Save preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});
