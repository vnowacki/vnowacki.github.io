const title = document.querySelector(".title");
const content = document.querySelector(".content");
const controls = document.querySelector(".controls");

var date = new Date();
var currYear = date.getFullYear();
var currMonth = date.getMonth();
var currDay = date.getDate();
var currWeekDay = date.getDay();

const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];

const monthsOtherForm = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];

const dayNames = ["pon", "wt", "śr", "czw", "pi", "so", "nie"];

const renderCalendar = () => {
    let lastDayOfCurrMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayOfPrevMonth = new Date(currYear, currMonth, 0).getDate();
    let firstDayOfCurrMonth = new Date(currYear, currMonth, 1).getDay();
    let lastWeekDayOfCurrMonth = new Date(currYear, currMonth, lastDayOfCurrMonth).getDay();

    let days = `<ul class="days">`;
    let weekdays = `<ul class="weekdays">`;

    for(i = 0; i < 7; i++) {
        weekdays += `<li>${dayNames[i]}</li>`;
    }

    let startValue = (firstDayOfCurrMonth == 0) ? 6 : firstDayOfCurrMonth - 1;
    for(i = startValue; i > 0; i--) {
        days += `<li class="inactive">${lastDayOfPrevMonth - i + 1}</li>`;
    }

    for(i = 1; i <= lastDayOfCurrMonth; i++) {
        let dateNow = new Date();
        let active = "";
        if(currYear == dateNow.getFullYear() && currMonth == dateNow.getMonth() && i == dateNow.getDate()) active = `active`;
        days += `<li class="normal ${active}">${i}</li>`;
    }

    if(lastWeekDayOfCurrMonth != 0)
    for(i = lastWeekDayOfCurrMonth; i < 7; i++) {
        days += `<li class="inactive">${i - lastWeekDayOfCurrMonth + 1}</li>`;
    }

    content.innerHTML = weekdays + `</ul>`;
    content.innerHTML += days + `</ul>`;
    title.innerHTML = `${currYear} ${months[currMonth]}`;
    controls.innerHTML = `<span id="prev" class="material-symbols-outlined control">chevron_left</span><span id="next" class="material-symbols-outlined control">chevron_right</span>`;

    document.querySelectorAll('.control').forEach(button => {
        button.addEventListener('click', () => {
            currMonth = (button.id == 'prev') ? --currMonth : ++currMonth;
    
            if(currMonth < 0 || currMonth > 11) {
                date = new Date(currYear, currMonth);
                currYear = date.getFullYear();
                currMonth = date.getMonth();
            }
    
            renderCalendar();
        });
    });

    document.querySelectorAll(".days li.normal").forEach(button => {
        button.addEventListener('click', () => {
            renderForm(button);
        });   
    });
}

const renderForm = (sender) => {
    let displayedDay = sender.innerHTML;

    title.innerHTML = `<span class="displayedDay">${displayedDay}</span> ${monthsOtherForm[currMonth]} ${currYear} `;
    controls.innerHTML = `<span id="close" class="material-symbols-outlined control">close</span>`;

    document.querySelector('.control').addEventListener('click', () => {
        renderCalendar();
    });

    content.innerHTML = `<div class="events"></div>`;
    
    const eventsContainer = document.querySelector('.events');

    eventsContainer.innerHTML = `<div class="info"><span class="material-symbols-outlined button">warning</span> brak wydarzeń</div>`;
}

renderCalendar();