function toggleMenu() {
    const menu = document.getElementById("settingsMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}
window.onclick = function(event) {
    if (!event.target.matches('.settings-btn')) {
        const menu = document.getElementById("settingsMenu");
        if (menu.style.display === "block") {
            menu.style.display = "none";
        }
    }
};