const todo = new ToDo("[todo-container]");
todo.draw();

addEventListener("scroll", () => {
    const scrollToTopBtn = document.querySelector(".scroll-to-top-button");
    let heightInitialWindow = window.scrollY;
    if (heightInitialWindow > 0) {
        scrollToTopBtn.classList.remove("hidden");
    } else {
        scrollToTopBtn.classList.add("hidden");
    }
})

