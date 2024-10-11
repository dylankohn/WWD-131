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