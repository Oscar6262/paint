function startPosition(e) {
        
            if (selectedTool === "radius" && !radiusElement) {
                drawCircleBresenham(startPoint.x, startPoint.y, 0);
                radiusElement = document.createElement("div");
                radiusElement.classList.add("Radius");
                radiusElement.style.left = startPoint.x + "px";
                radiusElement.style.top = startPoint.y + "px";
                radiusElement.style.width = elementSize + "px";
                radiusElement.style.height = elementSize + "px";
                paintContainer.appendChild(radiusElement);
          
            }
        
    function endPosition(e) {
		lse if (selectedTool === "radius") {
                drawCircleBresenham(startPoint.x, startPoint.y, Math.sqrt((e.clientX - startPoint.x)**2 + (e.clientY - startPoint.y)**1));
	}
	
	function draw(e) {
	if (painting && selectedTool === "radius") {
            updateRadius(e.clientX - paintContainer.offsetLeft, e.clientY - paintContainer.offsetTop);
        
	}
	
function drawCircleBresenham(centerX, centerY, radius) {
        let x = radius;
        let y = 0;
        let err = 0;
        console.log(radius);
        while (x >= y) {
            drawRadiusElement(centerX + x, centerY - y);
            drawRadiusElement(centerX + y, centerY - x);
            drawRadiusElement(centerX - y, centerY - x);
            drawRadiusElement(centerX - x, centerY - y);
            drawRadiusElement(centerX - x, centerY + y);
            drawRadiusElement(centerX - y, centerY + x);
            drawRadiusElement(centerX + y, centerY + x);
            drawRadiusElement(centerX + x, centerY + y);
    
            if (err <= 0) {
                y += 1;
                err += 2 * y + 1;
            }
    
            if (err > 0) {
                x -= 1;
                err -= 2 * x + 1;
            }
        }
    }
    
    function drawRadiusElement(x, y) {
        const radiusElement = document.createElement('div');
        radiusElement.classList.add('Radius');
        radiusElement.style.left = x + 'px';
        radiusElement.style.top = y + 'px';
        paintContainer.appendChild(radiusElement);
    }
    
    

    
    
    
    function updateRadius(x, y) {
        if (radiusElement) {
            radiusElement.remove();
        }
        radiusElement = document.createElement("div");
        radiusElement.classList.add("Radius");
        radiusElement.style.left = x - elementSize / 2 + "px"; // Ajusta la posición izquierda
        radiusElement.style.top = y - elementSize / 2 + "px"; // Ajusta la posición superior
        radiusElement.style.width = elementSize + "px";
        radiusElement.style.height = elementSize + "px";
        paintContainer.appendChild(radiusElement);
    }