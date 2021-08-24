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

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1500,
  });

  let i = 0;
  scrollToPage(0);
  container?.addEventListener('mousewheel',
    debounce((e: any) => {
      requestAnimationFrame(() => {
        if (e.deltaY > 0) {
          scrollToPage(i);
          if (i < pages.length - 1) i += 1;
        } else {
          if (i > 0) i -= 1;
          scrollToPage(i);
        }
      })
    }, 100, true));

  const scrollDownButton = document.querySelector('.scroll-down');
  scrollDownButton?.addEventListener('click', () => {
    scrollToPage(1);
  });

  slider.forEach(sliderElement =>
    sliderElement.addEventListener('click', (e) => {
      scrollToPage(+(sliderElement as HTMLElement)?.dataset?.pageNumber);
  }));
});

function scrollToPage(i: number) {
  console.log('scrool', i)
  const top = (pages[i] as HTMLElement).offsetTop;
  window.scrollTo({ top, behavior: 'smooth' });
  slider.forEach(item => item.classList.remove('active'));
  slider[i]?.classList.add('active');
}
