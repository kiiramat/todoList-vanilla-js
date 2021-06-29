class ToDo {
    constructor(selector) {
        this.mainContainer = document.querySelector(selector);

        // DOM Elements
        this.parentContainerForInputAndAddButton = null;
        this.userInputElement = null;
        this.addButtonElement = null;
        this.deleteButton = null;
        this.checkboxInput = null;
        this.checkboxLabel = null;
        this.tasksBoard = null;
        this.tasksList = null;
        this.listItemElement = null;
        this.clearFinishedTasksButtonContainer = null;
        this.clearAllTasksButtonContainer = null;
        this.clearAllTasksButton = null;
    }

    draw(){
        this.drawTitle();
        this.drawInputBox();
        this.drawAddButton();
        this.drawTaskBoard();
        this.drawClearFinishedTasksButton();
        this.drawClearTaskBoardButton();
    }

    drawTitle() {
        const titleContainer = elementUtils.createDivElement("title-container");
        const title = document.createElement("h1");
        title.className = "title";
        title.innerHTML = "To-Do List";

        titleContainer.append(title);
        this.mainContainer.append(titleContainer);
    }

    drawInputBox() {
        this.parentContainerForInputAndAddButton = elementUtils.createDivElement("container-input-add_button");
        const inputContainer = elementUtils.createDivElement("input-container");
        this.userInputElement = elementUtils.createInputElement("input-field", "text", "New task", "task");

        this.userInputElement.addEventListener("keydown", (event) => {
            if (event.code === "Enter" && this.userInputElement.value !== "") {
                this.addToListAction();
            }
        })
        
        inputContainer.append(this.userInputElement);
        this.parentContainerForInputAndAddButton.append(inputContainer);
        this.mainContainer.append(this.parentContainerForInputAndAddButton);
    }

    drawAddButton() {
        const addButtonContainer = elementUtils.createDivElement("add-button-container");
        this.addButtonElement = elementUtils.createButtonElement("add-button", "ADD", () => {
            const userInput = this.userInputElement.value;
            if (userInput === "") {
                return;
            }
            this.addToListAction();
        });

        addButtonContainer.append(this.addButtonElement);
        this.parentContainerForInputAndAddButton.append(addButtonContainer);
    }

    addToListAction() {
            this.userTaskCreated(this.userInputElement.value);
            this.clearAllTasksButtonContainer.classList.remove("hidden");
            this.clearFinishedTasksButtonContainer.classList.remove('hidden');
            this.userInputElement.value = "";
    }
    
    userTaskCreated(userInput) {
        this.listItemElement = document.createElement("li");
        this.listItemElement.className = "individual-list"
        this.deleteTaskButton();
        this.addTaskAndCheckbox(userInput);
        
        this.tasksList.append(this.listItemElement);
    }  

    deleteTaskButton() {
        const deleteButton = elementUtils.createButtonElement("task-delete-button", "x", (event) => {
            event.target.parentNode.remove();
            if (this.tasksList.innerHTML === "") {
                this.clearAllTasksButtonContainer.classList.add("hidden");
                this.clearFinishedTasksButtonContainer.classList.add('hidden');
            }
        })

        this.listItemElement.append(deleteButton);
    }

    addTaskAndCheckbox(userInput) {
        const checkbox = elementUtils.createDivElement("checkbox");
        this.checkboxInput = elementUtils.createCheckboxInput("task-checkbox",userInput, userInput, (event) => {
            this.addOrRemoveLineThroughCheckboxLabel(event);  
        });
        this.checkboxLabel = elementUtils.createCheckboxLabel("task-label", userInput, userInput);
        
        checkbox.append(this.checkboxInput);
        checkbox.append(this.checkboxLabel);
        this.listItemElement.append(checkbox); 
    }

    addOrRemoveLineThroughCheckboxLabel(event) {
        const task = event.target.nextSibling;
        if (event.target.checked) {
            task.classList.add("line-through");
        } else {
            task.classList.remove("line-through");
        }
    }

    drawTaskBoard() {
        this.tasksBoard = elementUtils.createDivElement("task-board-container");
        this.tasksList = document.createElement("ul");
        this.tasksList.className = "tasks-list";
        
        this.tasksBoard.append(this.tasksList);
        this.mainContainer.append(this.tasksBoard);
    }

    drawClearFinishedTasksButton() {
        this.clearFinishedTasksButtonContainer = elementUtils.createDivElement("clear-finished-tasks-button-container hidden");
        const clearFinishedTasksButton = elementUtils.createButtonElement("clear-finished-tasks-button", "CLEAR DONE", () => {
            this.removeFinishedTasks();
            this.removeButtonsWhenTaskBoardEmpty();
        })

        this.clearFinishedTasksButtonContainer.append(clearFinishedTasksButton);
        this.mainContainer.append(this.clearFinishedTasksButtonContainer);
    }

    removeFinishedTasks() {
        const collectAllLis = document.querySelectorAll(".task-board-container>ul>li");
        collectAllLis.forEach(li => {
            const listLabel = li.querySelector('.task-label')
            if (listLabel.classList.contains("line-through")) {
                li.remove();
            }
        })
    }

    removeButtonsWhenTaskBoardEmpty() {
        const taskBoard = document.querySelector("ul");
        if (taskBoard.innerHTML === "") {
            this.clearAllTasksButtonContainer.classList.add("hidden");
            this.clearFinishedTasksButtonContainer.classList.add('hidden');
        }
    }

    drawClearTaskBoardButton() {
        this.clearAllTasksButtonContainer = elementUtils.createDivElement("clear-button-container hidden");
        this.clearAllTasksButton = elementUtils.createButtonElement("clear-button", "CLEAR ALL", () => {
            const taskBoard = document.querySelector("ul");
            taskBoard.innerHTML = "";
            this.clearFinishedTasksButtonContainer.classList.add('hidden');
            this.clearAllTasksButtonContainer.classList.add("hidden");
        });

        this.clearAllTasksButtonContainer.append(this.clearAllTasksButton);
        this.mainContainer.append(this.clearAllTasksButtonContainer);
    }
}