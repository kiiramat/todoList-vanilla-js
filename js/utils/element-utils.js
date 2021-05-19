const elementUtils = {};

elementUtils.createDivElement = (className) => {
    const container = document.createElement("div");
    container.className = className;

    return container;
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