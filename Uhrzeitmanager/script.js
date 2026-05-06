let timeDisplay = document.getElementById('time-display');

function updateTime() {
    let now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    let milliseconds = String(now.getMilliseconds()).padStart(1, '0');
    milliseconds = milliseconds.substring(0, 1); // Take only the first digit of milliseconds
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}0`;

    let lessonDisplay = document.getElementById('lesson-display');
    let schoolTime = detectSchoolTime();

    console.log(schoolTime);
    lessonDisplay.innerHTML = schoolTime;
    return;

}


setInterval(updateTime, 100);
updateTime();

function detectSchoolTime() {
    const starts = [
        [8, 0],
        [8, 55],
        [10, 0],
        [10, 55],
        [11, 50],
        [12, 45],
        [13, 40],
        [14, 35],
        [15, 30],
        [16, 25],
        [17, 20],
    ]
    const pause = [

        [8, 50],
        [8, 55],

        [9, 45],
        [10, 0],

        [10, 50],
        [10, 55],

        [11, 45],
        [11, 50],

        [12, 40],
        [12, 45],

        [13, 35],
        [13, 40],

        [14, 30],
        [14, 35],

        [15, 25],
        [15, 30],

        [16, 20],
        [16, 25],

        [17, 15],
        [17, 20],
    ]


    let ret;

    let date = new Date();

    const pad = n => String(n).padStart(2, '0');

    if (date.getHours() > 18) {
        ret = "Wait till tomorrow 🎀";
    } else {
        let found = false;

        for (let j = 0; j < pause.length; j += 2) {
            let start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), pause[j][0], pause[j][1], 0, 0);
            let end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), pause[j + 1][0], pause[j + 1][1], 0, 0);

            if (date >= start && date < end) {
                document.getElementById("pause").innerText = "Nächste Stunde";
                ret = `${pad(end.getHours())}:${pad(end.getMinutes())}:00`;
                found = true;
                break;
            }

            if (date < start) {
                document.getElementById("pause").innerText = "Nächste Pause";
                ret = `${pad(start.getHours())}:${pad(start.getMinutes())}:00`;
                found = true;
                break;
            }
        }

        if (!found) {
            ret = "School is over for today";
        }
    }

    return ret;
}
