document.addEventListener('DOMContentLoaded', function() {
    const anchorInfo = document.getElementById('racer1');
    const anchorElements = document.querySelectorAll('.anchor a');

    anchorElements.forEach(function(anchor, index) {
        const href = anchor.getAttribute('href');
        const text = anchor.textContent;

        const anchorDetails = document.createElement('div');
        anchorDetails.className = 'anchor-details';
        anchorDetails.innerHTML = `
            <h2>Anchor Tag ${index + 1}</h2>
            <p>HREF: ${href}</p>
            <p>Text: ${text}</p>
        `;

        anchorInfo.appendChild(anchorDetails);
    });
});