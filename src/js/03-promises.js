import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('button'),
};

refs.form.addEventListener('input', onFormInput);
refs.form.addEventListener('submit', onFormSubmit);

let formValue = {}

function onFormInput(evt) {
  formValue[evt.target.name] = evt.target.value;
  // console.log(formValue[evt.target.name] = evt.target.value);

};

function onFormSubmit(evt) {
  evt.preventDefault();

  let inputDelay = Number(formValue.delay);
  let step = Number(formValue.step);
  let amount = Number(formValue.amount);
  //Конвертуємо NaN в 0
  step = step || 0;

  
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = inputDelay + step * i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
}

