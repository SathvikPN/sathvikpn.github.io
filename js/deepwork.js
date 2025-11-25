
/*
 * Deepwork Timer and Todo List
 */

document.addEventListener('DOMContentLoaded', () => {
    initTimer();
    initTodo();
});

/* -------------------------------------------------------------------------- */
/*                                    Timer                                   */
/* -------------------------------------------------------------------------- */
function initTimer() {
    const timerDisplay = document.getElementById('timer-display');
    const lapDisplay = document.getElementById('lap-display');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');

    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function updateDisplay() {
        timerDisplay.textContent = formatTime(elapsedTime);

        // Calculate laps (every 20 minutes)
        const minutes = Math.floor(elapsedTime / 60);
        const laps = Math.floor(minutes / 20);
        lapDisplay.textContent = `Laps: ${laps}`;
    }

    function startTimer() {
        if (isRunning) return;

        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;

        // Adjust start time to account for previously elapsed time
        // We use setInterval for simplicity in this context, but Date.now() delta is more accurate for long periods.
        // Let's use Date.now() to prevent drift.
        const startTimestamp = Date.now() - (elapsedTime * 1000);

        timerInterval = setInterval(() => {
            const now = Date.now();
            elapsedTime = Math.floor((now - startTimestamp) / 1000);
            updateDisplay();
        }, 1000);
    }

    function pauseTimer() {
        if (!isRunning) return;

        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        clearInterval(timerInterval);
    }

    function resetTimer() {
        pauseTimer();
        elapsedTime = 0;
        updateDisplay();
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
}

/* -------------------------------------------------------------------------- */
/*                                    Todo                                    */
/* -------------------------------------------------------------------------- */
function initTodo() {
    const todoBody = document.getElementById('todo-body');
    const addTaskBtn = document.getElementById('add-task-btn');

    function createRow() {
        const tr = document.createElement('tr');
        tr.className = 'todo-row';
        tr.innerHTML = `
            <td><input type="text" class="todo-input" placeholder="Task..."></td>
            <td class="text-center"><input type="checkbox" class="todo-check"></td>
            <td><input type="text" class="todo-input" placeholder="Remarks..."></td>
        `;
        return tr;
    }

    addTaskBtn.addEventListener('click', () => {
        const newRow = createRow();
        todoBody.appendChild(newRow);
        // Focus on the first input of the new row
        newRow.querySelector('input').focus();
    });

    // Optional: Add strikethrough style when checked
    todoBody.addEventListener('change', (e) => {
        if (e.target.classList.contains('todo-check')) {
            const row = e.target.closest('tr');
            const taskInput = row.querySelector('td:first-child .todo-input');
            if (e.target.checked) {
                taskInput.style.textDecoration = 'line-through';
                taskInput.style.color = 'var(--text-muted)';
            } else {
                taskInput.style.textDecoration = 'none';
                taskInput.style.color = 'var(--text-secondary)';
            }
        }
    });
}
