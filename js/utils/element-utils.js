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

elementUtils.createButtonElement = (className, func) => {
    const buttonElement = document.createElement("button");
    buttonElement.className = className;
    buttonElement.addEventListener("click", func);

    return buttonElement;
}

elementUtils.createCheckboxInput = (id, text) => {
    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.id = id;
    checkboxInput.name = text;

    return checkboxInput;
}

elementUtils.createCheckboxLabel = (identifier, labelInnerHtml) => {
    const checkboxLabel = document.createElement("label");
    checkboxLabel.for = identifier;
    checkboxLabel.innerHTML = labelInnerHtml;

    return checkboxLabel;
}