<template>
  <footer class="footer">
    <small class="footer-content">
      made with ❤️ by
      <a href="https://www.linkedin.com/in/valentino-mettifogo/" target="_blank" rel="noopener noreferrer">
        Valentino Mettifogo
      </a>
      <span class="separator">•</span>
      <a href="https://github.com/valentinomettifogo/countdown-weekend" target="_blank" rel="noopener noreferrer"
        aria-label="GitHub repository">
        <svg class="github-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"
          fill="#888">
          <path
            d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.39-3.87-1.39-.53-1.34-1.3-1.7-1.3-1.7-1.07-.74.08-.73.08-.73 1.18.08 1.8 1.22 1.8 1.22 1.05 1.79 2.76 1.27 3.43.97.1-.76.41-1.27.74-1.56-2.56-.3-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.51.11-3.14 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.63.24 2.84.12 3.14.75.81 1.2 1.84 1.2 3.1 0 4.45-2.7 5.41-5.27 5.7.42.36.79 1.08.79 2.18v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
        </svg>
      </a>
    </small>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 1rem;
  width: 100%;
  text-align: center;
  user-select: none;
  z-index: 10;
}

.footer-content {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  background: var(--color-surface);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-subtle);
}

.footer a {
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer a:hover {
  color: var(--color-accent);
}

.github-icon {
  transition: fill 0.2s ease;
  fill: var(--color-text-muted);
}

.footer a:hover .github-icon {
  fill: var(--color-accent);
}

.separator {
  color: var(--color-border);
  font-weight: bold;
}

@media (max-width: 640px) {
  .footer-content {
    font-size: 0.7rem;
    padding: 0.375rem 0.75rem;
    gap: 0.375rem;
  }
}
</style>
