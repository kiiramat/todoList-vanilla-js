class ToDo {
    constructor(selector) {
        this.mainContainer = document.querySelector(selector);

        // DOM Elements
        this.userInputElement = null;
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
        
        inputContainer.append(this.userInputElement);
        this.mainContainer.append(inputContainer);
    }

    drawAddButton() {
        const submitButtonContainer = elementUtils.createDivElement("add-button-container");
        const buttonElement = elementUtils.createButtonElement("add-button", "Add", () => {
            const userInput = this.userInputElement.value;
            if (userInput === "") {
                return;
            }

            this.userTaskCreated(userInput);

            this.clearTaskButtonContainer.classList.remove("hidden");
            this.userInputElement.value = "";
        });

        submitButtonContainer.append(buttonElement);
        this.mainContainer.append(submitButtonContainer);
    }
    
    userTaskCreated(userInput) {
        this.listItemElement = document.createElement("li");
        this.deleteTaskButton();
        this.checkboxInput = elementUtils.createCheckboxInput(userInput, userInput);
        this.checkboxLabel = elementUtils.createCheckboxLabel(userInput, userInput);
        
        this.listItemElement.append(this.checkboxLabel);
        this.listItemElement.append(this.checkboxInput); 
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