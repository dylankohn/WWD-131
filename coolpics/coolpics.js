const menu = document.getElementById("menu");
        const menuToggle = document.getElementById("menuToggle");

        menuToggle.addEventListener("click", function () {
            // Toggle between showing and hiding the menu
            if (menu.classList.contains("menuHide")) {
                menu.classList.remove("menuHide");
                menu.classList.add("menuShow");
            } else {
                menu.classList.remove("menuShow");
                menu.classList.add("menuHide");
            }
        });

function handleResize() {
    const menu = document.querySelector(".menu");
    if (window.innerWidth > 1000){
        menu.classList.remove("menuHide");
    } else {
        menu.classList.add("menuShow");
    }
}

const viewer = document.querySelector('.viewer');
const closeButton = document.querySelector('.close-viewer');
const images = document.querySelectorAll('img[src="norris-sm.jpeg"]');

closeButton.addEventListener('click', closeViewer)
images.forEach(image => {
    image.addEventListener('click', openViewer)
});
function openViewer(){
    viewer.style.display = 'grid'; 
}
function closeViewer() {
    viewer.style.display = 'none'; 
}
handleResize();
window.addEventListener("resize", handleResize);