let countdownTimer;
let timerSeconds = 5; // Set the initial timer value in seconds

console.log('Popup script loaded!');

document.getElementById('startTimer').addEventListener('click', () => {
  console.log('Start Timer button clicked!');
  chrome.runtime.sendMessage({ action: 'startTimer' });

  // Start or restart the countdown timer
  startCountdown();
});

function startCountdown() {
  // Clear any existing timer
  clearInterval(countdownTimer);

  // Update the timer element immediately
  updateTimerDisplay();

  // Start the countdown timer
  countdownTimer = setInterval(() => {
    timerSeconds--;

    // Update the timer display every second
    updateTimerDisplay();

    // Check if the timer has reached 0
    if (timerSeconds <= 0) {
      clearInterval(countdownTimer);
      document.getElementById('timer').innerText = 'Time is up!';

      // Open a new tab with exercise.html
      chrome.tabs.create({ url: '../html/exercise.html' });
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timerElement = document.getElementById('timer');
  timerElement.innerText = `Time remaining: ${timerSeconds} seconds`;
}


// document.getElementById('startTimer').addEventListener('click', function() {
//     chrome.runtime.sendMessage({ action: 'startTimer' });
//   });
  
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'showExerciseTab') {
        chrome.tabs.create({ url: chrome.runtime.getURL('html/exercise.html') });
    }
    });

//   document.getElementById('startTimer').addEventListener('click', () => {
//     chrome.runtime.sendMessage({ action: 'startTimer' });
//   });
  
  