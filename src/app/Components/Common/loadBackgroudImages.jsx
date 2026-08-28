export default function loadBackgroudImages() {
    if (typeof document !== 'undefined') {
      let backgroudImages = document.querySelectorAll("[data-background]");

      if (backgroudImages.length > 0) {
        backgroudImages.forEach(element => {
          let image = element.dataset.background;
          element.style.backgroundImage = `url('${image}')`;
        })
      }
    }
  }
