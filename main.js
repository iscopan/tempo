const countdownDate = new Date("Dec 8, 2021 23:59:59").getTime();

var workTime = 0;
var sleepTime = 0;
var foodTime = 0;
var freeTime = 0;

var active = '';

window.onload = function() {

    var second = setInterval(function() {
        calculateLeftTime();
        if(active === 'work') {
            calculateWorkTime();
        } else if (active === 'sleep') {
            calculateSleepTime();
        } else if (active === 'food') {
            calculateFoodTime();
        } else if (active === 'free') {
            calculateFreeTime();
        }
    }, 1000);

}

const activity = {
    date: new Date().getTime(),
    active: '',
}

function calculateLeftTime() {
    let now = new Date().getTime();
    let distance = countdownDate - now;

    let hours = Math.floor((distance / (1000 * 60 * 60)));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("left").innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';
}

function calculateWorkTime() {
    workTime = workTime + 1;

    let hours = Math.floor((workTime / (60 * 60)));
    let minutes = Math.floor((workTime % (60 * 60)) / (60));
    let seconds = Math.floor((workTime % (60)));

    document.getElementById("work").innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';
}

function calculateSleepTime() {
    sleepTime = sleepTime + 1;

    let hours = Math.floor((sleepTime / (60 * 60)));
    let minutes = Math.floor((sleepTime % (60 * 60)) / (60));
    let seconds = Math.floor((sleepTime % (60)));

    document.getElementById("sleep").innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';
}

function calculateFoodTime() {
    foodTime = foodTime + 1;

    let hours = Math.floor((foodTime / (60 * 60)));
    let minutes = Math.floor((foodTime % (60 * 60)) / (60));
    let seconds = Math.floor((foodTime % (60)));

    document.getElementById("food").innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';
}

function calculateFreeTime() {
    freeTime = freeTime + 1;

    let hours = Math.floor((freeTime / (60 * 60)));
    let minutes = Math.floor((freeTime % (60 * 60)) / (60));
    let seconds = Math.floor((freeTime % (60)));

    document.getElementById("free").innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';
}

function startWorkTime() {
    active = 'work';
}

function startSleepTime() {
    active = 'sleep';
}

function startFoodTime() {
    active = 'food';
}

function startFreeTime() {
    active = 'free';
}