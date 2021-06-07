class ToDo {
    constructor(selector) {
        this.mainContainer = document.querySelector(selector);
        this.userInputCollection = [];

        // DOM Elements
        this.userInputElement = null;
        this.checkboxInput = null;
        this.checkboxLabel = null;
        this.listItemElement = null;
    }

    draw(){
        this.drawTitle();
        this.drawInputBox();
        this.drawSubmitButton();
        this.drawTaskBoard();
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

    drawSubmitButton() {
        const submitButtonContainer = elementUtils.createDivElement("submit-button-container");
        const buttonElement = elementUtils.createButtonElement("submit-button", "Add", () => {
            const userInput = this.userInputElement.value;
            if ( userInput === "") {
                return;
            }

            this.userInputCollection.push(userInput);
            this.userTaskCreated();
            this.userInputElement.value = "";
        });

        submitButtonContainer.append(buttonElement);
        this.mainContainer.append(submitButtonContainer);
    }

    userTaskCreated() {
        const task = this.userInputCollection[this.userInputCollection.length - 1];
        this.checkboxInput = elementUtils.createCheckboxInput(task, task);
        this.checkboxLabel = elementUtils.createCheckboxLabel(task, task);

        this.listItemElement.append(this.checkboxInput);
        this.listItemElement.append(this.checkboxLabel);
    }   
    
    drawTaskBoard() {
        const tasksBoard = elementUtils.createDivElement("task-board-container");
        const tasksUnorderedListElement = document.createElement("ul");
        this.listItemElement = document.createElement("li");

        tasksUnorderedListElement.append(this.listItemElement);
        tasksBoard.append(tasksUnorderedListElement);
        this.mainContainer.append(tasksBoard);
    }    
}