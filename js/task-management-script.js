const addTaskButtons = document.querySelectorAll('.add-button');
addTaskButtons.forEach(button => {
  button.addEventListener('click', handleAddTaskButtonClick);
});

function handleAddTaskButtonClick() {
  const taskInput = this.previousElementSibling;
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const taskList = this.parentElement.previousElementSibling;
    const newTask = createTaskElement(taskText);
    taskList.appendChild(newTask);
    taskInput.value = '';

    updateTaskSections();
  }
}

function createTaskElement(text) {
  const taskItem = document.createElement('li');
  taskItem.className = 'task-item';
  taskItem.draggable = true;

  const grabElement = document.createElement('span');
  grabElement.className = 'grab-element';
  grabElement.innerHTML = '&#9776;'; // Add any desired grab symbol or icon

  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.className = 'task-checkbox';
  taskCheckbox.addEventListener('change', updateTaskSections);

  const taskText = document.createElement('span');
  taskText.className = 'task-text';
  taskText.textContent = text;

  const taskButtons = document.createElement('div');
  taskButtons.className = 'task-buttons';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'task-button delete';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    taskItem.remove();
    updateTaskSections();
  });

  taskButtons.appendChild(deleteButton);
  taskItem.appendChild(grabElement);
  taskItem.appendChild(taskCheckbox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(taskButtons);

  // Add event listeners for drag events
  taskItem.addEventListener('dragstart', handleDragStart);
  taskItem.addEventListener('dragover', handleDragOver);
  taskItem.addEventListener('drop', handleDrop);

  return taskItem;
}

function handleDragStart(event) {
  draggedTask = event.target;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', draggedTask.innerHTML);
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event) {
  event.preventDefault();
  const targetTask = event.target.closest('.task-item');

  // Swap the positions of dragged task and target task
  if (draggedTask && targetTask !== draggedTask) {
    const targetIndex = Array.from(targetTask.parentNode.children).indexOf(targetTask);
    const draggedIndex = Array.from(targetTask.parentNode.children).indexOf(draggedTask);

    if (targetIndex > draggedIndex) {
      targetTask.parentNode.insertBefore(draggedTask, targetTask.nextSibling);
    } else {
      targetTask.parentNode.insertBefore(draggedTask, targetTask);
    }

    updateTaskSections();
  }
}

function updateTaskSections() {
  const taskSections = document.querySelectorAll('.task-section');
  taskSections.forEach(section => {
    const tasks = section.querySelectorAll('.task-item');
    const progressBar = section.querySelector('.progress-bar-fill');
    const progressBarText = section.querySelector('.progress-bar-text');

    calculateCompletionPercentage(tasks, progressBar, progressBarText);
  });
}

function calculateCompletionPercentage(tasks, progressBar, progressBarText) {
  const totalTasks = tasks.length;
  const completedTasks = Array.from(tasks).filter(task => task.querySelector('.task-checkbox').checked).length;
  const completionPercentage = totalTasks > 0 ? Math.floor((completedTasks / totalTasks) * 100) : 0;

  progressBar.style.width = `${completionPercentage}%`;
  progressBarText.textContent = `${completionPercentage}%`;
}
