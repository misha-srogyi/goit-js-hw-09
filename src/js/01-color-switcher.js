
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  bodyColor: document.querySelector('body'),
}

refs.bodyColor.style.justifyContent = 'center';
refs.bodyColor.style.display = 'flex';

class Timer {
  constructor({cangeColor}) {
    this.intervalId = null;
    // this.isActive = false;
    this.changeColor = cangeColor;
  }

  start() {
    // if(this.isActive) {
    //   return;
    // }
    // this.isActive = true;
    refs.startBtn.setAttribute('disabled', true);
    refs.stopBtn.removeAttribute('disabled');

    this.intervalId = setInterval(() => {
      refs.bodyColor.style.backgroundColor = `${this.changeColor()}`;
    }, 1000);
  };

  stop() {
    clearInterval(this.intervalId);
    // this.isActive = false;
      refs.startBtn.removeAttribute('disabled');
      refs.stopBtn.setAttribute('disabled', true);
  };
}

const timer = new Timer({
  // створюємо обєкт настройок і передаєм ссилку на ф-цію
  cangeColor: getRandomHexColor,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer)); //() => { timer.start() }
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));  //() => { timer.stop() }


//======N2======

// const timer = {
//   intervalId: null,
//   isActive: false,
  
//   start() {
//     if(this.isActive) {
//       return;
//     }
    
//     this.isActive = true;

//     this.intervalId = setInterval(() => {
//       refs.bodyColor.style.backgroundColor = `${getRandomHexColor()}`;
//     }, 1000);
//   },

//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//   },
// };



