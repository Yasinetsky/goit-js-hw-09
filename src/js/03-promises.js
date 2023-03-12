import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      const result = { position, delay };
      shouldResolve ? resolve(result) : reject(result);
    }, delay);
  })
    .then(result => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      console.log(`Promise ${result.position} fulfilled in ${result.delay}ms`);
      return result;
    })
    .catch(result => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      console.log(`Promise ${result.position} rejected in ${result.delay}ms`);
      throw result;
    });
}

const form = document.querySelector('.form');
form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  for (let i = 1; i <= amount; i++) {
    const position = i;
    const promiseDelay = delay + (i - 1) * step;
    createPromise(position, promiseDelay);
  }
});
