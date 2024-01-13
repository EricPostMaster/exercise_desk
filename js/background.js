let timerId;

function startTimer() {
    timerId = setTimeout(function() {
      chrome.runtime.sendMessage({ action: 'showExerciseTab' });
      clearInterval(timerId);
    }, 6000); // 6 seconds
  }

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'startTimer') {
    startTimer();
  }
});
