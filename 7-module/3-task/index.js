function createElement(spans) {
  let div = document.createElement('div')
  div.innerHTML = `
  <!--Корневой элемент слайдера-->
    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb" style="left: 0%;">
      <span class="slider__value">3</span>
    </div>
    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: 0%;"></div>
    <!--Шаги слайдера-->
    <div class="slider__steps">
      ${spans}
    </div>`
  div.classList.add('slider');
  return div
}

export default class StepSlider {
  constructor({steps, value = 0}) {
    this.steps = steps;
    this.value = value;
    this.elem = createElement(this.createsteps());
    this.changevalueslider(this.value);
    this.initlistener();
  }

  createsteps() {
    let steps = '';
    for(let i = 0; i < this.steps; i++) {
      steps+=`<span></span>`
    }
    return steps
  }
  
  changevalueslider(value) {
    let 
      sliderValue = this.elem.querySelector('.slider__value'),
      sliderSteps = this.elem.querySelector('.slider__steps'),
      thumb = this.elem.querySelector('.slider__thumb'),
      progress = this.elem.querySelector('.slider__progress'),
      valuePercents = value / (this.steps - 1) * 100;

    sliderValue.textContent = value;
     
    for(let elem of sliderSteps.children) {
      elem.classList.remove('slider__step-active');
    }

    sliderSteps.children[value].classList.add('slider__step-active');  

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
  }

  initlistener() {
    this.elem.addEventListener('click', (event) => {
      let 
        left = event.clientX - this.elem.getBoundingClientRect().left,
        leftRelative = left / this.elem.offsetWidth,
        approximateValue = leftRelative * (this.steps - 1),
        value = Math.round(approximateValue);

      this.changevalueslider(value);
      this.addevent(value);
    });
  }

  addevent(value) {
    let event = new CustomEvent('slider-change', {detail: value, bubbles: true});
    this.elem.dispatchEvent(event);
  }

}
