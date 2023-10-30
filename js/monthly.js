const calendarGrid = document.querySelector(".calendar-grid");
const currentMonthLabel = document.querySelector(".current-month");
const today = new Date();
let selectedDate = today.getDate().toString(); // 선택한 날짜를 오늘로 초기화

function selectDate(event) {
    const target = event.target;
    if (target.classList.contains("calendar-cell")) {
        selectedDate = target.textContent;
        showTodoListForSelectedDate();
    }
}

function showTodoListForSelectedDate() {
    const todoList = document.querySelector(".todolist-main-container");
    todoList.innerHTML = "";

    if (todoData[selectedDate] && todoData[selectedDate].length > 0) {
        todoData[selectedDate].forEach((todo, index) => {
            const listItem = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.onclick = function() {
                todo.completed = checkbox.checked;
                localStorage.setItem('todoData', JSON.stringify(todoData));
                if (checkbox.checked) {
                    listItem.classList.add("completed");
                } else {
                    listItem.classList.remove("completed");
                }
            };
            listItem.appendChild(checkbox);

            const textSpan = document.createElement("span");
            textSpan.textContent = todo.content;
            listItem.appendChild(textSpan);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "x";
            deleteButton.onclick = function() {
                todoData[selectedDate] = todoData[selectedDate].filter((item, i) => i !== index);
                listItem.remove();
                localStorage.setItem('todoData', JSON.stringify(todoData));
            };
            listItem.appendChild(deleteButton);

            if (todo.completed) {
                listItem.classList.add("completed");
            }

            todoList.appendChild(listItem);
        });
    } else {
        // 할 일이 없는 경우 해당 날짜의 캘린더 셀 배경색 투명하게 변경
        const calendarCells = document.querySelectorAll(".calendar-cell");
        calendarCells.forEach(cell => {
            if (cell.textContent === selectedDate) {
                cell.style.backgroundColor = "transparent";
            }
        });
    }
}

function updateTodoList() {
    const todoList = document.querySelector(".todolist-main-container");
    todoList.innerHTML = "";

    if (todoData[selectedDate] && todoData[selectedDate].length > 0) {
        todoData[selectedDate].forEach((todo, index) => {
            const listItem = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.onclick = function() {
                todo.completed = checkbox.checked;
                localStorage.setItem('todoData', JSON.stringify(todoData));
                if (checkbox.checked) {
                    listItem.classList.add("completed");
                } else {
                    listItem.classList.remove("completed");
                }
            };
            listItem.appendChild(checkbox);

            const textSpan = document.createElement("span");
            textSpan.textContent = todo.content;
            listItem.appendChild(textSpan);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "x";
            deleteButton.onclick = function() {
                todoData[selectedDate] = todoData[selectedDate].filter((item, i) => i !== index);
                listItem.remove();
                localStorage.setItem('todoData', JSON.stringify(todoData));
            };
            listItem.appendChild(deleteButton);

            if (todo.completed) {
                listItem.classList.add("completed");
            }

            todoList.appendChild(listItem);
        });
    } else {
        // 할 일이 없는 경우 해당 날짜의 캘린더 셀 배경색 투명하게 변경
        const calendarCells = document.querySelectorAll(".calendar-cell");
        calendarCells.forEach(cell => {
            if (cell.textContent === selectedDate) {
                cell.style.backgroundColor = "transparent";
            }
        });
    }
}

function generateCalendar(year, month) {
    selectedDate = today.getDate().toString(); // 이전 날짜를 초기화

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    calendarGrid.innerHTML = "";
    const startDay = firstDay.getDay();

    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("calendar-cell");
        emptyCell.classList.add("empty-cell");
        calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const calendarCell = document.createElement("div");
        calendarCell.classList.add("calendar-cell");
        calendarCell.innerText = day;
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            calendarCell.classList.add("thisday");
        }
        calendarGrid.appendChild(calendarCell);
    }

    currentMonthLabel.innerText = `${year}년 ${month + 1}월`;
}

function showPrevMonth() {
    today.setMonth(today.getMonth() - 1);
    generateCalendar(today.getFullYear(), today.getMonth());
}

function showNextMonth() {
    today.setMonth(today.getMonth() + 1);
    generateCalendar(today.getFullYear(), today.getMonth());
}

function addTodoOnKeyUpHandle(event) {
    if (event.keyCode === 13) {
        const inputElement = document.querySelector(".text-input");
        const todoText = inputElement.value.trim();
        if (todoText !== "") {
            if (!todoData[selectedDate]) {
                todoData[selectedDate] = [];
            }

            todoData[selectedDate].push({ content: todoText, completed: false });
            inputElement.value = "";

            updateTodoList(); // 수정: updateTodoList 함수 호출
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const dateCells = document.querySelectorAll(".calendar-cell");
    dateCells.forEach(cell => {
        cell.addEventListener("click", () => {
            selectedDate = cell.textContent;
            updateTodoList(); // 수정: updateTodoList 함수 호출
        });
    });

    dateCells.forEach(cell => {
        const cellDate = cell.textContent;
        if (todoData[cellDate] && todoData[cellDate].length > 0) {
            cell.style.backgroundColor = "#365c9612";
            cell.style.cursor = "pointer";
        }

        if (cellDate === today.getDate().toString() && today.getFullYear() === today.getFullYear() && today.getMonth() === today.getMonth()) {
            cell.style.backgroundColor = "#2b4875";
        }
    });
});

generateCalendar(today.getFullYear(), today.getMonth());
