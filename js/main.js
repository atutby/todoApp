// массив для хранения задач
let arrayTasks = [];

// поиск формы на странице
const form = document.querySelector('#newTaskForm');
const taskInput = document.querySelector('#addNewTask');
const tasksList = document.querySelector('#tasksList');

//получение данных из localstorage
if(localStorage.getItem('arrayTasks')){
    arrayTasks = JSON.parse(localStorage.getItem('arrayTasks'));
    arrayTasks.forEach(function (item) {
        const taskHtml = `<li class="list-group-item d-flex justify-content-between">
                             <span class="task-title">${item}</span>
                             <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
                          </li>
        `;

         tasksList.insertAdjacentHTML('afterbegin', taskHtml);
    })
}

// отслеживаем событие отправки формы
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Добавляем задачу в массив tasks
    const taskText = taskInput.value;
    arrayTasks.push(taskText);

    // сохранение в localstorage
    localStorage.setItem('arrayTasks', JSON.stringify(arrayTasks) );

    const taskHtml = `<li class="list-group-item d-flex justify-content-between">
                        <span class="task-title">${taskText}</span>
                        <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
                      </li>
    `;
    tasksList.insertAdjacentHTML('afterbegin', taskHtml);
    taskInput.value = '';
})


//удаление задачи
tasksList.addEventListener('click', function (event) {

    if(event.target.getAttribute('data-action') === 'delete-task' ){
       const textValue = event.target.closest('li').querySelector('.task-title').textContent;
       const taskIndex = arrayTasks.indexOf(textValue);
       arrayTasks.splice(taskIndex, 1);

       localStorage.setItem('arrayTasks', JSON.stringify(arrayTasks) );
       event.target.parentElement.remove();
    }
})

