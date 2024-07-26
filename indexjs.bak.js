

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("submit-button").addEventListener('click', () => {
        fetch (`https://www.thecolorapi.com/scheme?hex=${colorPicker.value.slice(1)}`)
        .then(res => res.json())
        .then(data => {
          const colorBg = document.querySelectorAll("div.color-bg")
          for (let i = 0; i < 5; i++) {
            console.log(data.colors[i].hex.value);
            console.log(colorPicker.value)
            colorBg[i].style.background = data.colors[i].hex.value
            console.log(`hex=${colorPicker.value.slice(1)}`)
          }
          
        })
    });
});


let colorPicker;
const defaultColor = "#aa00ff";

window.addEventListener("load", startup, false);

function startup() {
    colorPicker = document.querySelector("#color-picker");
    colorPicker.value = defaultColor;
    colorPicker.addEventListener("input", updateFirst, false);
    colorPicker.addEventListener("change", updateAll, false);
    colorPicker.select();
  }

  function updateFirst(event) {
    const p = document.querySelector("p");
    if (p) {
      p.style.color = event.target.value;
    }
  }

  
  function updateAll(event) {
    document.querySelectorAll("p").forEach((p) => {
      p.style.color = event.target.value;
    });
  }
  