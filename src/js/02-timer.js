import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import "flatpickr/dist/themes/material_blue.css";

// import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    button: document.querySelector('[data-start]'),
    input: document.querySelector('#datetime-picker'),

    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

refs.button.setAttribute('disabled', true);
refs.button.addEventListener('click', onButtonStartClick );

let selectedDate = 0;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        selectedDate = selectedDates[0].getTime();
        // console.log(selectedDate);
        const currentDate = new Date().getTime();
        // console.log(currentDate);
        const differentTime = selectedDate - currentDate;
        // console.log(differentTime);
        // Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
        // differentTime <= 0
        if (selectedDate <= currentDate) {
            Notiflix.Notify.failure('Please choose a date in the future');
            return;
        }
        refs.button.removeAttribute('disabled');
        // refs.button.style.backgroundColor = 'lightgreen';
        
    },
};

function onButtonStartClick() {
    refs.button.setAttribute('disabled', true);

    const timer = setInterval(() => {
        const dateNow = new Date().getTime();
        // console.log(dateNow);
        const differentTime = selectedDate - dateNow;
        // differentTime > 0
        if (selectedDate > dateNow) {
            // console.log(differentTime);
            updateTimer(convertMs(differentTime));
            return;
        } 
        clearInterval(timer);
    },1000)
}

flatpickr('#datetime-picker', options);

function updateTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
};
// Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
// Добавляєм 0 до двох цифер
function pad(value) {
    return String(value).padStart(2, '0');
}



