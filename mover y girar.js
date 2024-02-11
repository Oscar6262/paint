//* funcion mover y girar 
    let selectedElement = null;
    let offset = { x: 0, y: 0 };
    let initialRotation = 0;
    let mouseStartPosition = { x: 0, y: 0 };
    let elementStartPosition = { x: 0, y: 0 };

    // Función para iniciar el movimiento del cuadrado
    function startDragOrRotate(e) {
        if (e.target.classList.contains("square") || e.target.classList.contains("line") || e.target.classList.contains("triangle") || e.target.classList.contains("star") || e.target.classList.contains("ellipse") || e.target.classList.contains("radius") || e.target.classList.contains("octagon")) {
            selectedElement = e.target;
            offset.x = e.clientX - parseInt(selectedElement.style.left);
            offset.y = e.clientY - parseInt(selectedElement.style.top);

            // Guardar datos de rotación
            initialRotation = parseFloat(selectedElement.dataset.rotation) || 0;
            mouseStartPosition = { x: e.clientX, y: e.clientY };
            elementStartPosition = {
                x: parseFloat(selectedElement.style.left),
                y: parseFloat(selectedElement.style.top)
            };

            // Guardar datos de rotación
            selectedElement.dataset.initialRotation = initialRotation;

            // Calcular el centro de la figura
            const rect = selectedElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calcular la distancia desde el punto de clic hasta el centro de la figura
            const distanceToCenter = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);

            // Determinar si se hizo clic en el centro o en una esquina de la figura
            if (distanceToCenter < Math.min(rect.width, rect.height) / 2) {
                // Se hizo clic en el centro, activar el movimiento
                paintContainer.addEventListener("mousemove", drag);
            } else {
                // Se hizo clic en una esquina, activar la rotación
                paintContainer.addEventListener("mousemove", rotate);
            }

            // Desactivar la selección de texto durante el movimiento y la rotación
            selectedElement.style.userSelect = "none";
        }
    }
    
    // Función para mover el cuadrado
    function drag(e) {
        if (selectedElement) {
            selectedElement.style.left = (e.clientX - offset.x) + "px";
            selectedElement.style.top = (e.clientY - offset.y) + "px";
        }
    }

    // Función para rotar la figura
    function rotate(e) {
        if (selectedElement) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const deltaX = mouseX - mouseStartPosition.x;
            const deltaY = mouseY - mouseStartPosition.y;

            // Calcular ángulo de rotación
            const angle = Math.atan2(deltaY, deltaX);
            const rotation = (angle * (180 / Math.PI)) + initialRotation;

            // Aplicar rotación a la figura
            selectedElement.style.transform = `rotate(${rotation}deg)`;
        }
    }

    // Función para detener el movimiento o la rotación del cuadrado
    function endDragOrRotate() {
        paintContainer.removeEventListener("mousemove", drag);
        paintContainer.removeEventListener("mousemove", rotate);
        selectedElement = null;
    }

    // Agregar event listeners para iniciar, mover y detener el movimiento o la rotación del cuadrado
    paintContainer.addEventListener("mousedown", startDragOrRotate);
    paintContainer.addEventListener("mouseup", endDragOrRotate);

    // Prevenir el comportamiento predeterminado para los eventos del mouse para evitar la selección de texto y otras acciones del navegador
    paintContainer.addEventListener("mousedown", function(e) {
        e.preventDefault();
    });
    paintContainer.addEventListener("mousemove", function(e) {
        e.preventDefault();
    });
    paintContainer.addEventListener("mouseup", function(e) {
        e.preventDefault();
    });