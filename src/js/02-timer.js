import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  button: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinuts: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};
refs.button.disabled = true;
let selectData = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectData = selectedDates[0].getTime();

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');

      selectData = new Date() + 1000;

      refs.button.disabled = true;
    } else if (selectedDates[0] > new Date()) {
      refs.button.disabled = false;
    }
  },
};

refs.button.addEventListener('click', () => {
  timer.start();
});

flatpickr('#datetime-picker', options);
const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    refs.button.disabled = true;

    this.isActive = true;
    this.intervalId = setInterval(() => {
      const ms = selectData - new Date();
      const { days, hours, minutes, seconds } = convertMs(ms);

      if (selectData - 1000 < new Date()) {
        clearInterval(this.intervalId);
        this.isActive = false;
        updateTimer({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        Notiflix.Notify.success('Timer has ended!');
        return;
      }
      updateTimer({ days, hours, minutes, seconds });
    }, 1000);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = `${days}`;
  refs.timerHours.textContent = `${hours}`;
  refs.timerMinuts.textContent = `${minutes}`;
  refs.timerSeconds.textContent = `${seconds}`;
}
