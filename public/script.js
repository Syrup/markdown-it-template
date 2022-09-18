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







let dark = document.body.classList[0] === "dark" ? true : false

const linkdark = document.querySelector(`link[title="dark"]`)
const linklight = document.querySelector(`link[title="light"]`)
let btn = document.querySelector(".mode")
let indicator;
let color;

btn.addEventListener("click", (e) => {
  e.preventDefault()
  let indicator = dark ? "🌑" : "☀️";
  // let color = dark ? "#fff" : "#000";
  // const link = document.querySelector(`link[title=${dark ? "dark" : "light"}]`)
  document.body.classList.toggle("dark");
  dark = !dark;
  btn.textContent = indicator;
  btn.classList.toggle("mode");
  btn.classList.toggle("mode-dark");
  /*
  if(linklight.disabled) linklight.removeAttribute("disabled")
  if(!linklight.disabled) linklight.setAttribute("disabled", "disabled")
  if(linkdark.disabled) linkdark.removeAttribute("disabled")
  if(!linkdark.disabled) linkdark.setAttribute("disabled", "disabled")*/

  document.querySelectorAll('link').forEach(link => {
    if(!link.title) return

    let disabled = link.disabled ? true : false

    //if(link.title !== (dark ? "dark" : "light")) {
      document.querySelector(`link[title="${dark ? "dark" : "light"}"]`).removeAttribute("disabled")
      document.querySelector(`link[title="${dark ? "light" : "dark"}"]`).setAttribute("disabled", "disabled")
    //}
  })


  document
  .querySelector("iframe.utterances-frame")
  .contentWindow.postMessage(
    { type: "set-theme", theme: dark ? "github-dark" : "github-light" },
    "https://utteranc.es/"
  );
})