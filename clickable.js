document.addEventListener('DOMContentLoaded', function() {
    // Fetch sector data from JSON
    fetch('sectors.json')
        .then(response => response.json())
        .then(data => {
            // Assuming the first sector for demonstration
            const sector = data[0]; // You might want to select this based on user action or another identifier

            var squares = document.querySelectorAll('.clickableSquare');
            squares.forEach(function(square) {
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
