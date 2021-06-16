class ToDo {
    constructor(selector) {
        this.mainContainer = document.querySelector(selector);

        // DOM Elements
        this.userInputElement = null;
        this.addButtonElement = null;
        this.deleteButton = null;
        this.checkboxInput = null;
        this.checkboxLabel = null;
        this.tasksBoard = null;
        this.tasksList = null;
        this.listItemElement = null;
        this.clearTaskButtonContainer = null;
        this.clearTaskButton = null;
    }

    draw(){
        this.drawTitle();
        this.drawInputBox();
        this.drawAddButton();
        this.drawTaskBoard();
        this.drawClearTaskBoardButton();
    }

    drawTitle() {
        const titleContainer = elementUtils.createDivElement("title-container");
        const title = document.createElement("h1");
        title.innerHTML = "To-Do List";

        titleContainer.append(title);
        this.mainContainer.append(titleContainer);
    }

    drawInputBox() {
        const inputContainer = elementUtils.createDivElement("input-container");
        this.userInputElement = elementUtils.createInputElement("input-field", "text", "new task", "task");

        this.userInputElement.addEventListener("keydown", (event) => {
            if (event.code === "Enter") {
                this.addToListAction();
            }
        })
        
        inputContainer.append(this.userInputElement);
        this.mainContainer.append(inputContainer);
    }

    drawAddButton() {
        const addButtonContainer = elementUtils.createDivElement("add-button-container");
        this.addButtonElement = elementUtils.createButtonElement("add-button", "Add", () => {
            const userInput = this.userInputElement.value;
            if (userInput === "") {
                return;
            }
            this.addToListAction();
        });

        addButtonContainer.append(this.addButtonElement);
        this.mainContainer.append(addButtonContainer);
    }

    addToListAction() {
            this.userTaskCreated(this.userInputElement.value);
            this.clearTaskButtonContainer.classList.remove("hidden");
            this.userInputElement.value = "";
    }
    
    userTaskCreated(userInput) {
        this.listItemElement = document.createElement("li");
        this.deleteTaskButton();
        this.addTaskAndCheckbox(userInput);
        
        this.tasksList.append(this.listItemElement);
    }  

    deleteTaskButton() {
        const deleteButton = elementUtils.createButtonElement("delete-button", "x", (event) => {
            event.target.parentNode.remove();
            if (this.tasksList.innerHTML === "") {
                this.clearTaskButtonContainer.classList.add("hidden");
            }
        })

        this.listItemElement.append(deleteButton);
    }

    addTaskAndCheckbox(userInput) {
        this.checkboxInput = elementUtils.createCheckboxInput(userInput, userInput, () => {
            this.addOrRemoveLineThroughCheckboxLabel();
        });
        this.checkboxLabel = elementUtils.createCheckboxLabel(userInput, userInput);
        
        this.listItemElement.append(this.checkboxLabel);
        this.listItemElement.append(this.checkboxInput); 
    }

    addOrRemoveLineThroughCheckboxLabel() {
        if (this.checkboxInput.checked) {
            this.checkboxLabel.classList.add("line-through");
        } else {
            this.checkboxLabel.classList.remove("line-through");
        }
    }

    drawTaskBoard() {
        this.tasksBoard = elementUtils.createDivElement("task-board-container");
        this.tasksList = document.createElement("ul");
        
        this.tasksBoard.append(this.tasksList);
        this.mainContainer.append(this.tasksBoard);
    }

    drawClearTaskBoardButton() {
        this.clearTaskButtonContainer = elementUtils.createDivElement("clear-button-container hidden");
        this.clearTaskButton = elementUtils.createButtonElement("clear-button", "Clear", () => {
            document.querySelector("ul").innerHTML = "";
        });

        this.clearTaskButtonContainer.append(this.clearTaskButton);
        this.mainContainer.append(this.clearTaskButtonContainer);
    }
}