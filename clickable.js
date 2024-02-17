function createStars(numberOfStars) {
    const map = document.querySelector('body');
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        const starType = Math.floor(Math.random() * 3); // Random number between 0 and 3

        star.className = 'star';
        switch (starType) {
            case 0: // Square
                star.classList.add('square');
                break;
            case 1: // Horizontal rectangle
                star.classList.add('horizontal-rectangle');
                break;
            case 2: // Vertical rectangle
                star.classList.add('vertical-rectangle');
                break;
        }

        const xPos = Math.floor(Math.random() * window.innerWidth);
        const yPos = Math.floor(Math.random() * window.innerHeight);

        star.style.left = `${xPos}px`;
        star.style.top = `${yPos}px`;
        map.appendChild(star);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    createStars(300); // Create 100 stars

    const mapContainer = document.getElementById('map-container');
    let isDrawing = false;
    let rect = {};
    let rectangles = []; // This will store your rectangles

    mapContainer.addEventListener('mousedown', function(e) {
        isDrawing = true;
        rect.startX = e.clientX - mapContainer.offsetLeft;
        rect.startY = e.clientY - mapContainer.offsetTop;
        rect.el = document.createElement('div');
        rect.el.className = 'rectangle';
        mapContainer.appendChild(rect.el);
    });

    mapContainer.addEventListener('mousemove', function(e) {
        if (!isDrawing) return;
        const x = e.clientX - mapContainer.offsetLeft;
        const y = e.clientY - mapContainer.offsetTop;
        const width = Math.abs(x - rect.startX);
        const height = Math.abs(y - rect.startY);
        const left = (x < rect.startX) ? x : rect.startX;
        const top = (y < rect.startY) ? y : rect.startY;
        
        rect.el.style.left = left + 'px';
        rect.el.style.top = top + 'px';
        rect.el.style.width = width + 'px';
        rect.el.style.height = height + 'px';
    });

    mapContainer.addEventListener('mouseup', function(e) {
        if (!isDrawing) return;
        isDrawing = false;
    
        // Show the createSectorModal
        document.getElementById('createSectorModal').style.display = 'block';
    
        // Attach the rectangle data to the form for reference
        const form = document.getElementById('createSectorForm');
        form.rectData = rect;
    
        // Reset the rect object for the next rectangle
        rect = {};
    });

    const createSectorModal = document.getElementById('createSectorModal');
    const createSectorForm = document.getElementById('createSectorForm');
    
    createSectorForm.addEventListener('submit', function(e) {
        e.preventDefault();
    
        // Create a new sector object
        const newSector = {
            name: createSectorForm.sectorName.value,
            region: createSectorForm.sectorRegion.value,
            location: {
                x: createSectorForm.rectData.startX,
                y: createSectorForm.rectData.startY,
                width: createSectorForm.rectData.el.style.width,
                height: createSectorForm.rectData.el.style.height
            }
            // Add additional sector data from the form as needed
        };
    
        // Add the new sector to your JSON structure (you'll need to handle this)
        // For now, we'll just log it to the console
        console.log(newSector);
    
        // Close the modal
        createSectorModal.style.display = 'none';
    
        // Reset the form for the next input
        createSectorForm.reset();
    });


    createSectorModal.querySelector('.close').addEventListener('click', function() {
        createSectorModal.style.display = 'none';
        // You can also clear any rectangles drawn on the map that haven't been saved
    });


    // Fetch sector data from JSON
    fetch('sectors.json')
        .then(response => response.json())
        .then(sectors => {
            const map = document.querySelector('body'); // Assuming you want to place the sectors within the body for now

            sectors.forEach(sector => {
                // Create a clickable square for each sector
                const square = document.createElement('div');
                square.classList.add('clickableSquare');
                square.style.left = `${sector.location.x}px`;
                square.style.top = `${sector.location.y}px`;
                map.appendChild(square);

                // Set up the click event for each square
                square.onclick = function() {
                    // Set modal content based on sector data
                    var modalContent = document.querySelector('.modal-content');
                    modalContent.innerHTML = `
                        <span class="close">&times;</span>
                        <h2>${sector.name} - ${sector.region}</h2>
                        <p>Settlements: ${sector.settlements.join(', ')}</p>
                        <p>Passages: ${sector.passages.map(passage => `${passage.name} to ${passage.leadsTo}`).join(', ')}</p>
                    `;
                    // Show the modal
                    document.getElementById('myModal').style.display = "block";

                    // Close functionality
                    var span = modalContent.querySelector('.close');
                    span.onclick = function() {
                        document.getElementById('myModal').style.display = "none";
                    }
                };
            });

            window.onclick = function(event) {
                var modal = document.getElementById('myModal');
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        });
});
