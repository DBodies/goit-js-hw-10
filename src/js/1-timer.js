import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"

const startBtn = document.querySelector("[data-start]")
const daysSpan = document.querySelector("[data-days]")
const hoursSpan = document.querySelector("[data-hours]")
const minutesSpan = document.querySelector("[data-minutes]")
const secondsSpan = document.querySelector("[data-seconds]")
const dateTimePicker = document.querySelector("#datetime-picker")

let selectedDay = null
let interval = null
    
startBtn.disabled = true

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      selectedDay = selectedDates[0];
      
      if (selectedDay <= new Date()) {
          startBtn.disabled = true
          iziToast.error({
              title: "Error",
              message: "Please choose a date in the future",
              position: "topCenter"
          })
      } else {
          startBtn.disabled = false
}
}
}
flatpickr(dateTimePicker, options)
function addZero(value) {
     return value.toString().padStart(2, "0")
}
function updateTime(timeLeft) {
    const days = Math.floor(timeLeft /  (1000 * 60 * 60 * 24))
const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor(timeLeft %  (1000 * 60 * 60) / (1000 * 60))
    const seconds = Math.floor(timeLeft % (1000 * 60) / 1000)
     daysSpan.textContent = addZero(days);
  hoursSpan.textContent = addZero(hours);
  minutesSpan.textContent = addZero(minutes);
  secondsSpan.textContent = addZero(seconds);
} 
function startTimer() {
    startBtn.disabled = true
    dateTimePicker.disabled = true
    interval = setInterval(() => {
        const now = new Date().getTime()
        const timeLeft = selectedDay - now
        if (timeLeft <= 0) {
            clearInterval(interval)
            updateTime(0)
            iziToast.success({
                title: "Success",
                message: "Finished",
                position: "topCenter"
            })
            dateTimePicker.disabled = false
            return
        }
        updateTime(timeLeft)
    },1000)
}
startBtn.addEventListener("click", startTimer)