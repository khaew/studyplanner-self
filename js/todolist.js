let todoData = {};

// 페이지 로딩 시 로컬 스토리지에서 데이터 불러오기
const savedData = JSON.parse(localStorage.getItem('todoData'));
if (savedData) {
    todoData = savedData;
    // 할 일 목록 복원
    updateTodoList(selectedDate);
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

               // 데이터 저장 (로컬 스토리지에 데이터 저장)
               localStorage.setItem('todoData', JSON.stringify(todoData));
            
               updateTodoList(selectedDate); // 추가된 할 일을 화면에 표시
           }
       }
   }

 
