// Initial Timer Durations
let workDuration = 25 * 60;
let shortBreakDuration = 5 * 60;
let longBreakDuration = 15 * 60;
let pomodorosCompleted = 0;
let currentDuration = workDuration;
let timerInterval;
let isRunning = false;
let isBreak = false;

// Toggle visibility of custom settings
function toggleCustomSettings() {
    const customSettings = document.getElementById("customSettings");
    customSettings.style.display = customSettings.style.display === "none" ? "block" : "none";
}

// Set custom timer values
function setCustomTime() {
    const workInput = document.getElementById('workInput').value;
    const shortBreakInput = document.getElementById('shortBreakInput').value;
    const longBreakInput = document.getElementById('longBreakInput').value;

    workDuration = workInput * 60;
    shortBreakDuration = shortBreakInput * 60;
    longBreakDuration = longBreakInput * 60;
    resetTimer();
    document.getElementById("customSettings").style.display = "none";
}

// Format seconds into MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

// Start the timer countdown
function startTimer() {
    if (isRunning) return;
    isRunning = true;
    document.getElementById('pauseButton').disabled = false;
    timerInterval = setInterval(() => {
        if (currentDuration > 0) {
            currentDuration--;
            document.getElementById('timer').textContent = formatTime(currentDuration);

            // Update the title with the current time remaining
            document.title = `${formatTime(currentDuration)} - ${isBreak ? 'Break' : 'Work'} Session`;
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            playAlertSound();
            handlePhaseTransition();
        }
    }, 1000);
}

// Handle transition between work and break phases
function handlePhaseTransition() {
    if (isBreak) {
        isBreak = false;
        currentDuration = workDuration;
        document.getElementById('status').textContent = "Work Session";
    } else {
        pomodorosCompleted++;
        document.getElementById('cycles').textContent = `Pomodoros Completed: ${pomodorosCompleted}`;
        
        if (pomodorosCompleted % 4 === 0) {
            currentDuration = longBreakDuration;
            document.getElementById('status').textContent = "Long Break";
        } else {
            currentDuration = shortBreakDuration;
            document.getElementById('status').textContent = "Short Break";
        }
        isBreak = true;
    }
    document.getElementById('timer').textContent = formatTime(currentDuration);
    document.title = `${formatTime(currentDuration)} - ${isBreak ? 'Break' : 'Work'} Session`;
}

// Play alert sound function
function playAlertSound() {
    const alertSound = document.getElementById("alertSound");
    alertSound.play();
}

// Pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById('pauseButton').disabled = true;
    document.title = "Pomodoro Timer";
}

// Reset the timer to the start of a work session
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isBreak = false;
    currentDuration = workDuration;
    document.getElementById('timer').textContent = formatTime(currentDuration);
    document.getElementById('pauseButton').disabled = true;
    document.getElementById('status').textContent = "Work Session";
    document.title = "Pomodoro Timer";
}

// Initialize the timer display
document.getElementById('timer').textContent = formatTime(currentDuration);
