class ToDo {
    constructor(selector) {
        this.mainContainer = document.querySelector(selector);
    }

    drawInputBox() {
        const inputContainer = elementUtils.createDivElement("input-container");
        const formElement = document.createElement("form");
        const inputElement = elementUtils.createInputElement("input-field", "text", "new task", "task");
        const buttonElement = elementUtils.createButtonElement("submit-button", "submit");
        
        formElement.append(inputElement);
        formElement.append(buttonElement);
        inputContainer.append(formElement);
        this.mainContainer.append(inputContainer);
    }

    draw(){
        this.drawInputBox();
    }
}