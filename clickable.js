document.addEventListener('DOMContentLoaded', function() {
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
