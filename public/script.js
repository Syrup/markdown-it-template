class Accordion {
  constructor(el) {
    this.el = el;
    this.summary = el.querySelector('summary');
    this.content = el.querySelector('.content');
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.summary.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    e.preventDefault();
    
    this.el.style.overflow = 'hidden';
    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;
    
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;
    
    if (this.animation) {
      this.animation.cancel();
    }
    
    this.animation = this.el.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    
    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
    
    if (this.animation) {
      this.animation.cancel();
    }
    this.animation = this.el.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = this.el.style.overflow = '';
  }
}

document.querySelectorAll('details').forEach((el) => {
  new Accordion(el);
});

// Dark mode functionality with localStorage persistence
const DARK_MODE_KEY = 'darkMode';

// Get initial dark mode state from localStorage or default to false
let dark = localStorage.getItem(DARK_MODE_KEY) === 'true';
let btn = document.querySelector(".mode");

// Function to update dark mode
function updateDarkMode(isDark) {
  dark = isDark;
  document.body.classList.toggle("dark", isDark);
  btn.textContent = isDark ? "☀️" : "🌑";
  btn.classList.toggle("mode", !isDark);
  btn.classList.toggle("mode-dark", isDark);
  
  // Save preference to localStorage
  localStorage.setItem(DARK_MODE_KEY, isDark);
  
  // Update utterances theme if iframe exists
  const utterancesFrame = document.querySelector("iframe.utterances-frame");
  if (utterancesFrame) {
    utterancesFrame.contentWindow.postMessage(
      { type: "set-theme", theme: isDark ? "github-dark" : "github-light" },
      "https://utteranc.es/"
    );
  }
  
  // Update highlight.js theme
  updateHighlightTheme(isDark);
}

// Function to update highlight.js theme dynamically
function updateHighlightTheme(isDark) {
  const existingTheme = document.querySelector('link[href*="highlight.js"]');
  if (existingTheme) {
    const newTheme = isDark 
      ? '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/github-dark-dimmed.min.css'
      : '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/github.min.css';
    existingTheme.href = newTheme;
  }
}

// Set initial state on page load
updateDarkMode(dark);

// Add click event listener
btn.addEventListener("click", () => {
  updateDarkMode(!dark);
});