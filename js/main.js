const todo = new ToDo("[todo-container]");
todo.draw();

addEventListener("scroll", () => {
    const scrollToTopBtn = document.querySelector(".scroll-to-top-button");
    let initialWindowHeight = window.scrollY;
    if (initialWindowHeight > 200) {
        scrollToTopBtn.classList.remove("hidden");
    } else {
        scrollToTopBtn.classList.add("hidden");
    }
})

