import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', runPromise);

function runPromise(evt) {
  evt.preventDefault();
  const delay = Number(form.delay.value);
  const step = Number(form.step.value);
  const amount = Number(form.amount.value);
  let totalDelay = delay;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, totalDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    totalDelay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}
