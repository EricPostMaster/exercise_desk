document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('startTimerBtn').addEventListener('click', startTimer);
  });
  
function startTimer() {
var minutes = parseInt(document.getElementById("timerInput").value);
var milliseconds = minutes * 60 * 1000;

var timerDisplay = document.getElementById('timerDisplay');
updateTimerDisplay(milliseconds);

var countdownInterval = setInterval(function () {
    milliseconds -= 1000;
    updateTimerDisplay(milliseconds);

    if (milliseconds <= 0) {
    clearInterval(countdownInterval);
    openNewTab();
    }
}, 1000);
}

function openNewTab() {
chrome.tabs.create({
    url: 'https://ericpostmaster.github.io/exercise_desk/'
});

// Optionally, you can close the popup after opening the tab
window.close();
}

function updateTimerDisplay(milliseconds) {
var minutes = Math.floor(milliseconds / 60000);
var seconds = Math.floor((milliseconds % 60000) / 1000);

var formattedTime = padZero(minutes) + ':' + padZero(seconds);
document.getElementById('timerDisplay').innerText = formattedTime;
}

function padZero(num) {
return (num < 10 ? '0' : '') + num;
}
