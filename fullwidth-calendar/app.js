// Check for Leap Year!
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0);
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
}

// Get the calendar container element
let calendar = document.querySelector('.calendar');

// Create array to store all months
const month_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// Get the Display Month Element
let monthPicker = document.querySelector('#month-picker');

// Generate the Month List View
monthPicker.onclick = () => {
    monthList.classList.add('show');
}

// Generate the CALENDAR
generateCalendar = (month, year) => {
    let calendarDays = calendar.querySelector('.calendar-days');
    let calendarHeaderYear = calendar.querySelector('#year');

    // Get ending days of the month?
    let daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendarDays.innerHTML = '';

    // Get the current date
    let currentDate = new Date();

    // render the current month to the display!
    monthPicker.textContent = month_names[month];

    // render the current year to the display!
    calendarHeaderYear.textContent = year;

    // Get the first day of the month
    let firstDay = new Date(year, month, 1);

    // Loop through currentDate and get first day?
    for(let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
        let day = document.createElement('div');
        if(i >= firstDay.getDay()) {
            day.classList.add('calendar-day-hover');
            day.textContent = i - firstDay.getDay() + 1;
            day.innerHTML += `
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span class="reminder-example">X Reminder</span>
            `;
            if(i - firstDay.getDay() + 1 === currentDate.getDate()
                && year === currentDate.getFullYear()
                && month === currentDate.getMonth()) {
                day.classList.add('current-date');
                day.innerHTML += `<span class="current-reminder-icons">🔔icons🔔</span>`;
            }
        }
        calendarDays.appendChild(day);
    }
}

// Get the monthlist element / update with month_names
let monthList = calendar.querySelector('.month-list');

// Loop through and display / hide the month list and re-render the calendar by month picked
month_names.forEach((e, index) => {
    let monthElement = document.createElement('div');
    monthElement.innerHTML = `<div>${e}</div>`;
    monthElement.onclick = () => {
        monthList.classList.remove('show');
        currentMonth.value = index;
        generateCalendar(currentMonth.value, currentYear.value)
    };
    monthList.appendChild(monthElement);
});

// Year Selector fns
const prevYear = document.querySelector('#prev-year')
    .onclick = () => {
        --currentYear.value;
        generateCalendar(currentMonth.value, currentYear.value);
    }

const nextYear = document.querySelector('#next-year')
    .onclick = () => {
        ++currentYear.value;
        generateCalendar(currentMonth.value, currentYear.value);
    }

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };

// Render onInit fn
generateCalendar(currentMonth.value, currentYear.value);


// Dark Mode Toggler
const ToggleDarkMode = document.querySelector('.dark-mode-switch')
    .onclick = () => {
        document.querySelector('body').classList.toggle('dark-mode');
        document.querySelector('body').classList.toggle('light-mode');
    };