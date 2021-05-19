const elementUtils = {};

elementUtils.createDivElement = (className) => {
    const inputContainer = document.createElement("div");
    inputContainer.className = className;
}

elementUtils.createInputElement = (className, type, placeholder, name) => {
    const inputTag = document.createElement("input");
    inputTag.className = className;
    inputTag.type = type;
    inputTag.placeholder = placeholder;
    inputTag.name = name;

    return inputTag;
}

elementUtils.createButtonElement = (className, type) => {
    const buttonElement = document.createElement("button");
    buttonElement.className = className;
    buttonElement.type = type;

    return buttonElement;
}