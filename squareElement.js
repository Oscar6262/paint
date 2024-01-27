 function startPosition(e) {

            painting = true;
            startPoint = { x: e.clientX - paintContainer.offsetLeft, y: e.clientY - paintContainer.offsetTop };
             if (selectedTool === "square" && !squareElement) {
                
                squareElement = document.createElement("div");
                squareElement.classList.add("square");
                squareElement.style.left = startPoint.x + "px";
                squareElement.style.top = startPoint.y + "px";
                paintContainer.appendChild(squareElement);
            }
    
    
    }
function endPosition(e) {
        if (painting) {
            painting = false;
    
           if (selectedTool === "square") {
                drawSquare(startPoint.x, startPoint.y, e.clientX - paintContainer.offsetLeft, e.clientY - paintContainer.offsetTop);
                squareElement = null;  // Restablece squareElement 

            } 
        }
    }
function draw(e) {
        
        if (!painting) return;
    
        if (selectedTool === "square") {
            updateSquare(e.clientX - paintContainer.offsetLeft, e.clientY - paintContainer.offsetTop);
        } 

function drawSquare(x1, y1, x2, y2) {
        
        const size = Math.min(Math.abs(x2 - x1), Math.abs(y2 - y1));
    
        // Crea el elemento del cuadrado
        squareElement = document.createElement("div");
        squareElement.classList.add("square");
        squareElement.style.width = size + "px";
        squareElement.style.height = size + "px";
        squareElement.style.left = Math.min(x1, x2) + "px";
        squareElement.style.top = Math.min(y1, y2) + "px";
        paintContainer.appendChild(squareElement);
    }
    
    function updateSquare(x, y) {
        if (!squareElement) return;
    
        // Actualiza el tamaño del cuadrado
        const size = Math.min(Math.abs(x - parseInt(squareElement.style.left)), Math.abs(y - parseInt(squareElement.style.top)));
        squareElement.style.width = size + "px";
        squareElement.style.height = size + "px";
    }