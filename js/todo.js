class ToDo {
    constructor(selector) {
        this.mainContainer = document.querySelector(selector);
        // this.userInputCollection = [];

        // DOM Elements
        this.userInputElement = null;
        this.deleteButton = null;
        this.checkboxInput = null;
        this.checkboxLabel = null;
        this.tasksUnorderedListElement = null;
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
            if (userInput === "") {
                return;
            }

            // this.userInputCollection.push(userInput);
            this.userTask(userInput);

            this.userInputElement.value = "";
        });

        submitButtonContainer.append(buttonElement);
        this.mainContainer.append(submitButtonContainer);
    }
    
    userTask(userInput) {
        this.listItemElement = document.createElement("li");
        this.deleteTaskButton();
        this.checkboxInput = elementUtils.createCheckboxInput(userInput, userInput);
        this.checkboxLabel = elementUtils.createCheckboxLabel(userInput, userInput);
        
        this.listItemElement.append(this.checkboxLabel);
        this.listItemElement.append(this.checkboxInput); 
        this.tasksUnorderedListElement.append(this.listItemElement);

    }  
    
    deleteTaskButton() {
        const deleteButton = elementUtils.createButtonElement("delete-button", "x", (event) => {
            let remove = event.target.parentNode;
            let parentNode = remove.parentNode;
            parentNode.removeChild(remove);
        })

        this.listItemElement.append(deleteButton);
    }
    
    drawTaskBoard() {
        const tasksBoard = elementUtils.createDivElement("task-board-container");
        this.tasksUnorderedListElement = document.createElement("ul");
        
        tasksBoard.append(this.tasksUnorderedListElement);
        this.mainContainer.append(tasksBoard);
    }    
}