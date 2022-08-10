function initialize() {
  return {
    hourEl: document.querySelector(".hour"),
    minuteEl: document.querySelector(".minute"),
    secondEl: document.querySelector(".second"),
    timeEl: document.querySelector(".time"),
    dateEl: document.querySelector(".date"),
    toggle: document.querySelector(".toggle"),
    needle: document.querySelector(".needle"),
    days: [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ],
    months: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
  }
}

function toggleDarkMode(e) {
  const html = document.querySelector("html")
  html.classList.toggle("dark")
  const text = html.classList.contains("dark") ? "Modo claro" : "Modo escuro"
  e.target.textContent = text
}

function setClock(elements, data) {
  const time = new Date()
  const month = time.getMonth()
  const day = time.getDay()
  const date = time.getDate()
  const hours = time.getHours()
  const hoursForClock = hours % 12
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  // Stackoverflow code https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
  function scale(number, inMin, inMax, outMin, outMax) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  }
  // ------------------------- end ------------------------------ //
  function setDate() {
    elements.dateEl.innerHTML = `${data.days[day]}, <span class="circle">${date}</span> de ${data.months[month]}`
  }

  elements.hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    hoursForClock,
    0,
    11,
    0,
    360
  )}deg) `
  elements.minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    minutes,
    0,
    59,
    0,
    360
  )}deg) `
  elements.secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    seconds,
    0,
    59,
    0,
    360
  )}deg) `

  elements.timeEl.textContent = `${hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`

  setDate()
}

function main() {
  const {
    hourEl,
    minuteEl,
    secondEl,
    timeEl,
    dateEl,
    toggle,
    needle,
    days,
    months,
  } = initialize()
  toggle.addEventListener("pointerup", toggleDarkMode)

  setClock(
    { hourEl, minuteEl, secondEl, timeEl, dateEl, needle },
    { months, days }
  )

  setInterval(
    () =>
      setClock(
        { hourEl, minuteEl, secondEl, dateEl, timeEl, needle },
        { months, days }
      ),
    1000
  )
}

main()
