let colorPicker;
const defaultColor = "#aa00ff";
const dropMenu = document.getElementById("drop-menu");
const colorPalette = document.getElementById("color-palette-id");
const colorBg = document.querySelectorAll("div.color-bg");
const colorBoxes = document.getElementsByClassName("color-box");
const form = document.getElementById("form");
const customAlert = document.getElementById("custom-alert");

// Access the selected value from the drop-down menu
colorPicker = document.querySelector("#color-picker");

// Function to convert RGB to Hex
function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

// Function to extract RGB values from the background style and convert to Hex
function extractAndConvertRgbToHex(style) {
    const rgbValues = style.match(/\d+/g).map(Number);
    return rgbToHex(rgbValues[0], rgbValues[1], rgbValues[2]);
}

// Function to show custom alert at mouse pointer position
function showCustomAlert(message, x, y) {
    customAlert.textContent = message;
    customAlert.style.left = `${x}px`;
    customAlert.style.top = `${y}px`;
    customAlert.style.display = 'block';
    setTimeout(() => {
        customAlert.style.display = 'none';
    }, 2000); // Hide after 2 seconds
}

// Add Event listener to color boxes
colorPalette.addEventListener("click", (event) => {
    if (event.target.classList.contains("color-bg")) {
        const style = event.target.style.background;
        const hexColor = extractAndConvertRgbToHex(style);
        
        // Copy the text to the clipboard
        navigator.clipboard.writeText(hexColor).then(() => {
            // Show custom alert at mouse pointer position
            showCustomAlert(`Copied: ${hexColor}`, event.clientX, event.clientY);
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    }
});

function logSubmit(event) {
    event.preventDefault();
    const selectedOption = dropMenu.value;

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorPicker.value.slice(1)}&mode=${selectedOption}`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < colorBoxes.length; i++) {
                const colorBox = colorBoxes[i];
                const colorBg = colorBox.querySelector("div.color-bg");
                const hexNbr = colorBox.querySelector("p");

                if (colorBg && hexNbr) {
                    colorBg.style.background = data.colors[i].hex.value;
                    hexNbr.textContent = data.colors[i].hex.value;
                }
            }
        });
}

form.addEventListener("submit", logSubmit);