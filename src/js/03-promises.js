import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('button'),
};

refs.form.addEventListener('input', onFormInput);
refs.button.addEventListener('click', onFormSubmit);

let formValue = {};

function onFormInput(evt) {
  formValue[evt.target.name] = evt.target.value;
  // console.log(formValue);
};

function onFormSubmit(evt) {
  evt.preventDefault();
  
  const inputDelay = Number(formValue.delay);
  const step = Number(formValue.step);
  const amount = Number(formValue.amount);
  
  for (let i = 0; i <= amount; i ++) {
    const position = i + 1;
    const delay = inputDelay + step * i;
    
    createPromise(position, delay)
    .then(({position, delay}) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({position, delay}) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    
  }
}

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => { 
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay})
      }
    }, delay);
  });
}

