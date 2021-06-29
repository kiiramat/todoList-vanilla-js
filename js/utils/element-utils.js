const elementUtils = {};

elementUtils.createDivElement = (className) => {
    const container = document.createElement("div");
    container.className = className;

    return container;
}

elementUtils.createH1Element = (className, text) => {
    const h1Element = document.createElement("h1");
    h1Element.className = className;
    h1Element.innerHTML = text;

    return h1Element;
}

elementUtils.createInputElement = (className, type, placeholder, name) => {
    const inputTag = document.createElement("input");
    inputTag.className = className;
    inputTag.type = type;
    inputTag.placeholder = placeholder;
    inputTag.name = name;

    return inputTag;
}

elementUtils.createButtonElement = (className, buttonText, func) => {
    const buttonElement = document.createElement("button");
    buttonElement.className = className;
    buttonElement.innerHTML = buttonText;
    buttonElement.addEventListener("click", func);

    return buttonElement;
}

elementUtils.createCheckboxInput = (className, id, text, func) => {
    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.className = className;
    checkboxInput.id = id;
    checkboxInput.name = text;
    checkboxInput.addEventListener("click", func);

    return checkboxInput;
}

elementUtils.createCheckboxLabel = (className, id, labelInnerHtml) => {
    const checkboxLabel = document.createElement("label");
    checkboxLabel.className = className;
    checkboxLabel.for = id;
    checkboxLabel.innerText = labelInnerHtml;

    return checkboxLabel;
}