const imageMarkup = '<img src="byui-logo_blue.webp" class="byuilogo">';
document.getElementById('toggleButton').addEventListener('click', function() {
    document.body.classList.toggle('inverted');
    const image = document.querySelector('.byuilogo'); // Get the image by its class
        if (image) {
            image.remove();
        } else {
            document.body.insertAdjacentHTML('beforeend', imageMarkup);
            newImage.remove();
        }
        const newImage = document.createElement("img");
        newImage.setAttribute("src", "byui-logo_white.png");
        newImage.setAttribute("alt", "invertedByui");
        newImage.classList.add("inverted-logo"); 
        document.body.appendChild(newImage);
});




