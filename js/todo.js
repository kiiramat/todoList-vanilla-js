class ToDo {
    constructor(selector) {
        this.mainContainer = document.querySelector(selector);

        // DOM Elements
        this.parentContainerForInputAndAddButton = null;
        this.userInputElement = null;
        this.addButtonElement = null;
        this.deleteButton = null;
        this.checkbox = null;
        this.checkboxInput = null;
        this.checkboxLabel = null;
        this.tasksBoardContainer = null;
        this.tasksList = null;
        this.listItemElement = null;
        this.clearFinishedTasksButtonContainer = null;
        this.clearAllTasksButtonContainer = null;
        this.clearAllTasksButton = null;
        this.scrollToTopBtn = null;
    }

    draw(){
        this.drawTitle();
        this.drawInputBox();
        this.drawAddButton();
        this.drawTaskBoard();
        this.drawClearFinishedTasksButton();
        this.drawClearTaskBoardButton();
        this.drawScrollToTopBtn();
    }

    drawTitle() {
        const titleContainer = elementUtils.createDivElement("title-container");
        const title = elementUtils.createH1Element("title", "To-Do List");

        titleContainer.append(title);
        this.mainContainer.append(titleContainer);
    }

    drawInputBox() {
        this.parentContainerForInputAndAddButton = elementUtils.createDivElement("container-input-add_button");
        const userInputContainer = elementUtils.createDivElement("input-container");
        this.userInputElement = elementUtils.createInputElement("input-field", "text", "New task", "task");

        this.userInputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && this.userInputElement.value !== "") {
                this.addToTaskBoardAction();
            }
        })
        
        userInputContainer.append(this.userInputElement);
        this.parentContainerForInputAndAddButton.append(userInputContainer);
        this.mainContainer.append(this.parentContainerForInputAndAddButton);
    }

    drawAddButton() {
        const addButtonContainer = elementUtils.createDivElement("add-button-container");
        this.addButtonElement = elementUtils.createButtonElement("add-button", "ADD", () => {
            const userInput = this.userInputElement.value;
            if (userInput === "") {
                return;
            }
            this.addToTaskBoardAction();
        });

        addButtonContainer.append(this.addButtonElement);
        this.parentContainerForInputAndAddButton.append(addButtonContainer);
    }

    addToTaskBoardAction() {
            this.createUserTask(this.userInputElement.value);
            this.showToggleButtonIfTextTooLong(this.checkboxLabel);
            this.userInputElement.value = "";
            this.clearAllTasksButtonContainer.classList.remove("hidden");
            this.clearFinishedTasksButtonContainer.classList.remove('hidden');
    }
    
    createUserTask(userInput) {
        this.listItemElement = document.createElement("li");
        this.listItemElement.className = "individual-list";
        this.addDeleteTaskButton();
        this.addCheckboxAndTask(userInput);
        
        this.tasksList.append(this.listItemElement);
    }  

    addDeleteTaskButton() {
        const deleteButton = elementUtils.createButtonElement("task-delete-button", "x", (event) => {
            event.target.parentNode.remove();
            if (this.tasksList.innerHTML === "") {
                this.clearAllTasksButtonContainer.classList.add("hidden");
                this.clearFinishedTasksButtonContainer.classList.add('hidden');
            }
        })

        this.listItemElement.append(deleteButton);
    }

    addCheckboxAndTask(userInput) {
        this.checkbox = elementUtils.createDivElement("checkbox");
        this.checkboxInput = elementUtils.createCheckboxInput("task-checkbox", this.generateUUID(), userInput, (event) => {
            this.addOrRemoveLineThroughTask(event);  
        });
        this.checkboxLabel = elementUtils.createCheckboxLabel("task-label", this.generateUUID(), userInput);
        this.checkboxLabel.innerHTML = this.highlightLinkInsideText(this.checkboxLabel.innerText);
        
        this.checkbox.append(this.checkboxInput);
        this.checkbox.append(this.checkboxLabel);
        this.listItemElement.append(this.checkbox); 
    }

    generateUUID() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    addOrRemoveLineThroughTask(event) {
        const task = event.target.nextSibling;
        if (event.target.checked) {
            task.classList.add("line-through");
        } else {
            task.classList.remove("line-through");
        }
    }

    highlightLinkInsideText(input) {
        const highlightedLink = anchorme({
            input,
            options: {
                attributes: {
                    target: "_blank",
                    class: "detected",
                },
            }
        })
        return highlightedLink;
    }

    showToggleButtonIfTextTooLong(task) {
        const taskMaxWidth = parseInt(getComputedStyle(task).maxWidth);
        const taskActualWidth = measureTextWidth(this.checkboxLabel, this.mainContainer, getComputedStyle(task));
        
        if (taskActualWidth >= taskMaxWidth) {
            const toggleButton = elementUtils.createHyperlinkButton("toggle-button", "#", "⌄", (event) => {
                this.switchToggleButton(toggleButton, event);
                event.preventDefault();
            });

            this.checkbox.append(toggleButton);
            this.checkboxLabel.classList.add("excerpt-hidden");
        }
    }

    switchToggleButton(button, e) {
        const task = e.target.previousSibling;
        if (button.innerHTML === "⌄") {
            button.innerHTML = "⌃";
            task.classList.remove("excerpt-hidden");
            task.classList.add("excerpt-visible");
        } else {
            button.innerHTML = "⌄";
            task.classList.add("excerpt-hidden");
            task.classList.remove("excerpt-visible");
        }
    }

    drawTaskBoard() {
        this.tasksBoardContainer = elementUtils.createDivElement("task-board-container");
        this.tasksList = document.createElement("ul");
        this.tasksList.className = "tasks-list";
        
        this.tasksBoardContainer.append(this.tasksList);
        this.mainContainer.append(this.tasksBoardContainer);
    }

    drawClearFinishedTasksButton() {
        this.parentContainerForClearButtons = elementUtils.createDivElement("container-clear-buttons");
        this.clearFinishedTasksButtonContainer = elementUtils.createDivElement("clear-finished-tasks-button-container hidden");
        const clearFinishedTasksButton = elementUtils.createButtonElement("clear-finished-tasks-button", "CLEAR DONE", () => {
            this.removeFinishedTasks();
            this.removeClearButtonsWhenTaskBoardEmpty();
        })

        this.clearFinishedTasksButtonContainer.append(clearFinishedTasksButton);
        this.parentContainerForClearButtons.append(this.clearFinishedTasksButtonContainer);
        this.mainContainer.append(this.parentContainerForClearButtons);
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

    removeClearButtonsWhenTaskBoardEmpty() {
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
        this.parentContainerForClearButtons.append(this.clearAllTasksButtonContainer);
    }

    drawScrollToTopBtn() {
        const scrollToTopBtnContainer = elementUtils.createDivElement("scroll-to-top-button-container");
        this.scrollToTopBtn = elementUtils.createButtonElement("scroll-to-top-button hidden", "BACK TO TOP", () => {
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });
        
        scrollToTopBtnContainer.append(this.scrollToTopBtn);
        this.mainContainer.append(scrollToTopBtnContainer);
    }
}