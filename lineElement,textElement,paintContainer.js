

document.addEventListener("DOMContentLoaded", function() {
    const paintContainer = document.getElementById("paintContainer");
    let painting = false;
    let startPoint = { x: 0, y: 0 };
    let lineElement = null; 
    let squareElement = null; 

    //elemento cursor del borrador para poderlo ver
    const eraserCursor = document.createElement('div');
    eraserCursor.classList.add('eraser-cursor');
    paintContainer.appendChild(eraserCursor);

    function startPosition(e) {

            painting = true;
            startPoint = { x: e.clientX - paintContainer.offsetLeft, y: e.clientY - paintContainer.offsetTop };
            if (selectedTool === "line") {
                // Crea la línea en el inicio 
                drawLine(startPoint.x, startPoint.y, startPoint.x, startPoint.y);
            }
    
    
    }

    function endPosition(e) {
        if (painting) {
            painting = false;
    
            if (selectedTool === "line") {
                drawLine(startPoint.x, startPoint.y, e.clientX - paintContainer.offsetLeft, e.clientY - paintContainer.offsetTop);
            }
        }
    }
    function draw(e) {
        
        if (!painting) return;
    
        if (selectedTool === "pencil") {
            drawPencil(e);
        } else if (selectedTool === "line") {
            
            updateLine(e.clientX - paintContainer.offsetLeft, e.clientY - paintContainer.offsetTop);
        } else if (selectedTool === "eraser") {
            drawEraser(e);
        } else if (selectedTool === "text") {
            drawText(e);
            
            
        }
    }

    

    function drawPencil(e) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.style.left = e.clientX - paintContainer.offsetLeft + "px";
        dot.style.top = e.clientY - paintContainer.offsetTop + "px";
        paintContainer.appendChild(dot);
    }

    function drawLine(x1, y1, x2, y2) {
        // Crea la línea
        const lineElement = document.createElement("div");
        lineElement.classList.add("line");
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1);
        lineElement.style.width = length + "px";
        lineElement.style.transform = `rotate(${angle}rad)`;
        lineElement.style.left = Math.min(x1, x2) + "px";
        lineElement.style.top = Math.min(y1, y2) + "px";
        paintContainer.appendChild(lineElement);
    }

    function drawEraser(e) {
        const elementsToRemove = document.elementsFromPoint(e.clientX, e.clientY);

        elementsToRemove.forEach((element) => {
            // Elimina los elementos con las clases
            if (element.classList.contains('dot') || element.classList.contains('line') || element.classList.contains('text')) {
                paintContainer.removeChild(element);
            }
        });
    }

    function drawText(e) {
        const textElement = document.createElement('div');
        textElement.contentEditable = true; // Permite la edición de contenido
        textElement.classList.add('text');
        textElement.style.left = e.clientX - paintContainer.offsetLeft + 'px';
        textElement.style.top = e.clientY - paintContainer.offsetTop + 'px';
        paintContainer.appendChild(textElement);
        textElement.focus(); // Enfoca el elemento de texto 
        // Agrega el evento 
        textElement.addEventListener('mousedown', function (event) {
            const offset = {
                x: event.clientX - textElement.getBoundingClientRect().left,
                y: event.clientY - textElement.getBoundingClientRect().top
            };
    
            function handleDragMove(event) {
                textElement.style.left = event.clientX - offset.x + 'px';
                textElement.style.top = event.clientY - offset.y + 'px';
            }
    
            function handleDragEnd() {
                document.removeEventListener('mousemove', handleDragMove);
                document.removeEventListener('mouseup', handleDragEnd);
            }
    
            document.addEventListener('mousemove', handleDragMove);
            document.addEventListener('mouseup', handleDragEnd);
        });
    }
    
    paintContainer.addEventListener("mousedown", startPosition);
    paintContainer.addEventListener("mouseup", endPosition);
    paintContainer.addEventListener("mousemove", draw);

    // Event listener para cambiar la herramienta seleccionada
    const toolRadioButtons = document.querySelectorAll('input[name="tool"]');
    toolRadioButtons.forEach(function(button) {
        button.addEventListener('change', function() {
            selectedTool = this.id;
            if (selectedTool === 'text') {
                drawText();

                document.getElementById('pencil').checked = true;
                selectedTool = 'pencil';
            }
        });
        
    });
    
    
    
});
