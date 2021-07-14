const todo = new ToDo("[todo-container]");
todo.draw();

addEventListener("scroll", () => {
    const scrollToTopBtn = document.querySelector(".scroll-to-top-button");
    let windowHeight = window.scrollY;
    if (windowHeight > 200) {
        scrollToTopBtn.classList.remove("hidden");
    } else {
        scrollToTopBtn.classList.add("hidden");
    }
})

