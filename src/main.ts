import './style.less';
import 'aos/dist/aos.css';
import AOS from 'aos/dist/aos';

export function debounce(func: Function, wait: number, immediate: boolean): any {
  let timeout;
  return function() {
    // @ts-ignore
    let context = this, args = arguments;
    let later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const container = document.querySelector('.main-container');
const pages = document.querySelectorAll('.page');
const slider = document.querySelectorAll('.slider_page');
let currentPage = 0;

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1500,
  });

  scrollToPage(0);
  container?.addEventListener('mousewheel',
    debounce((e: any) => {
      requestAnimationFrame(() => {
        if (e.deltaY > 0) {
          scrollToPage(currentPage);
          if (currentPage < pages.length - 1) currentPage += 1;
        } else {
          if (currentPage > 0) currentPage -= 1;
          scrollToPage(currentPage);
        }
      })
    }, 100, true));

  const scrollDownButton = document.querySelector('.scroll-down');
  scrollDownButton?.addEventListener('click', () => {
    currentPage = 1;
    scrollToPage(1);
  });

  slider.forEach((sliderElement) =>
    sliderElement.addEventListener('click', () => {
      currentPage = +(sliderElement as HTMLElement)?.dataset?.pageNumber;
      scrollToPage(currentPage);
  }));
});

function scrollToPage(i: number) {
  const top = (pages[i] as HTMLElement).offsetTop;
  window.scrollTo({ top, behavior: 'smooth' });
  slider.forEach(item => item.classList.remove('active'));
  slider[i]?.classList.add('active');
}

(function() {
  const burgerMenu = document.querySelector('.b-menu');
  const burgerContain = document.querySelector('.b-container');
  const burgerNav = document.querySelector('.b-nav');

  burgerMenu?.addEventListener('click', function toggleClasses() {
    [burgerContain, burgerNav].forEach(function (el) {
      el?.classList.toggle('open');
    });
  }, false);
})();
