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
