let octagonElement = nill;
function startPosition(e) {
if (selectedTool === "octagon" && !octagonElement) {
                drawOctagon(startPoint.x, startPoint.y, startPoint.x, startPoint.y); // Dibuja el octágono inicial
            }
}

function endPosition(e) {
if (selectedTool === "octagon" && octagonElement) {
                updateOctagon(e.clientX - paintContainer.offsetLeft, e.clientY - paintContainer.offsetTop);
                octagonElement = null;  // Restablece octagonElement 
            }
}
function draw(e) {
else if (painting && selectedTool === "octagon") {
            updateOctagon(e.clientX - paintContainer.offsetLeft, e.clientY - paintContainer.offsetTop);
        }
}
 function drawOctagon(x1, y1, x2, y2) {
        const size = Math.abs(x2 - x1);
        octagonElement = document.createElement("div");
        octagonElement.classList.add("octagon");
        octagonElement.style.width = size + "px";
        octagonElement.style.height = size + "px";
        octagonElement.style.left = x1 + "px";
        octagonElement.style.top = y1 + "px";
        paintContainer.appendChild(octagonElement);
    }

    function updateOctagon(x, y) {
        if (octagonElement) {
            const size = Math.abs(x - startPoint.x);
            octagonElement.style.width = size + "px";
            octagonElement.style.height = size + "px";
        }
    }