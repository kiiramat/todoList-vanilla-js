const computedStylesAsStyle = (computedStyles, elementTag) => {
    const element = document.createElement(elementTag||'p');
    document.body.append(element);
    const defaultStyles = getComputedStyle(element);
    const stylesList = [...computedStyles]
        .filter(key => computedStyles[key] !== defaultStyles[key])
        .map(key => `${key}: ${computedStyles[key]}`);
    element.remove();
    return stylesList.join(';');
}

const measureTextWidth = (textElement, mainWindow, computedStyles) => {
    let textWidth = 0;

    const provisionalTextElement = elementUtils.createParagraphElement("", textElement.innerHTML);
    provisionalTextElement.setAttribute('style', computedStylesAsStyle(computedStyles));
    
    mainWindow.append(provisionalTextElement);
    textWidth = provisionalTextElement.clientWidth;
    provisionalTextElement.remove();

    return textWidth;
}