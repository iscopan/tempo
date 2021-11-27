const countdownDate = new Date("Dec 8, 2021 23:59:59").getTime();

var workTime = 0;
var sleepTime = 0;
var foodTime = 0;
var freeTime = 0;

var active = '';

window.onload = function() {

    var storageHistoric = localStorage.getItem('activityHistoric');

    if (storageHistoric !== null) {
        const historic = storageHistoric.split(';').map((value) => {
            return {
                active: value.split('-')[0],
                date: parseInt(value.split('-')[1]),
            };
        });

        let latestDate = 0;
        for (let i = 0; i < historic.length; i++) {
            const activity = historic[i];
            if (latestDate !== 0) {
                if(active === 'work') {
                    workTime = workTime + ((activity.date - latestDate) / 1000);
                } else if (active === 'sleep') {
                    sleepTime = sleepTime + ((activity.date - latestDate) / 1000);
                } else if (active === 'food') {
                    foodTime = foodTime + ((activity.date - latestDate) / 1000);
                } else if (active === 'free') {
                    freeTime = freeTime + ((activity.date - latestDate) / 1000);
                }
            }
            active = activity.active;
            latestDate = activity.date;
        }

        let now = new Date().getTime();
        if(active === 'work') {
            workTime = workTime + ((now - latestDate) / 1000);
        } else if (active === 'sleep') {
            sleepTime = sleepTime + ((now - latestDate) / 1000);
        } else if (active === 'food') {
            foodTime = foodTime + ((now - latestDate) / 1000);
        } else if (active === 'free') {
            freeTime = freeTime + ((now - latestDate) / 1000);
        }
        
    }

    var second = setInterval(function() {
        if(active === 'work') {
            workTime = workTime + 1;
        } else if (active === 'sleep') {
            sleepTime = sleepTime + 1;
        } else if (active === 'food') {
            foodTime = foodTime + 1;
        } else if (active === 'free') {
            freeTime = freeTime + 1;
        }
        calculateTimes();
    }, 1000);

}

const activity = {
    date: 0,
    active: '',
    toString: function() {
        return this.active + '-' + this.date.toString();
    }
}

function saveNewActivity() {
    const newActivity = Object.create(activity);
    newActivity.date = new Date().getTime();
    newActivity.active = active;

    let historic = localStorage.getItem('activityHistoric');
    if (historic === null) {
        historic = newActivity.toString();
    } else {
        historic = historic + ';' + newActivity.toString();
    }
    localStorage.setItem('activityHistoric', historic);
}

function calculateTimes() {
    calculateWorkTime();
    calculateLeftTime();
    calculateSleepTime();
    calculateFoodTime();
    calculateFreeTime();
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
    let hours = Math.floor((workTime / (60 * 60)));
    let minutes = Math.floor((workTime % (60 * 60)) / (60));
    let seconds = Math.floor((workTime % (60)));

    document.getElementById("work").innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';
}

function calculateSleepTime() {
    let hours = Math.floor((sleepTime / (60 * 60)));
    let minutes = Math.floor((sleepTime % (60 * 60)) / (60));
    let seconds = Math.floor((sleepTime % (60)));

    document.getElementById("sleep").innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';
}

function calculateFoodTime() {
    let hours = Math.floor((foodTime / (60 * 60)));
    let minutes = Math.floor((foodTime % (60 * 60)) / (60));
    let seconds = Math.floor((foodTime % (60)));

    document.getElementById("food").innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';
}

function calculateFreeTime() {
    let hours = Math.floor((freeTime / (60 * 60)));
    let minutes = Math.floor((freeTime % (60 * 60)) / (60));
    let seconds = Math.floor((freeTime % (60)));

    document.getElementById("free").innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';
}

function startWorkTime() {
    active = 'work';
    saveNewActivity();
}

function startSleepTime() {
    active = 'sleep';
    saveNewActivity();
}

function startFoodTime() {
    active = 'food';
    saveNewActivity();
}

function startFreeTime() {
    active = 'free';
    saveNewActivity();
}