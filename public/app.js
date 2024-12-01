const form = document.getElementById('request-form');
const responseContainer = document.getElementById('response');
const addHeaderButton = document.getElementById('add-header');
const addBodyButton = document.getElementById('add-body');
const headersContainer = document.getElementById('headers-container');
const bodyContainer = document.getElementById('body-container');

// Add a new key-value pair input for headers
addHeaderButton.addEventListener('click', () => {
    const pairDiv = document.createElement('div');
    pairDiv.classList.add('key-value-pair');
    pairDiv.innerHTML = `
        <input type="text" placeholder="Key" class="key-input">
        <input type="text" placeholder="Value" class="value-input">
        <button type="button" class="remove-pair" onclick="removePair(this)">Remove</button>
    `;
    headersContainer.appendChild(pairDiv);
});

// Add a new key-value pair input for the body
addBodyButton.addEventListener('click', () => {
    const pairDiv = document.createElement('div');
    pairDiv.classList.add('key-value-pair');
    pairDiv.innerHTML = `
        <input type="text" placeholder="Key" class="key-input">
        <input type="text" placeholder="Value" class="value-input">
        <button type="button" class="remove-pair" onclick="removePair(this)">Remove</button>
    `;
    bodyContainer.appendChild(pairDiv);
});

// Remove a key-value pair
function removePair(button) {
    button.parentElement.remove();
}

// Extract key-value pairs as an object
function extractKeyValuePairs(container) {
    const pairs = container.querySelectorAll('.key-value-pair');
    const data = {};
    pairs.forEach(pair => {
        const key = pair.querySelector('.key-input').value;
        const value = pair.querySelector('.value-input').value;
        if (key) data[key] = value;
    });
    return data;
}

// Submit the request
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const method = document.getElementById('method').value;
    const headers = extractKeyValuePairs(headersContainer);
    const body = extractKeyValuePairs(bodyContainer);

    try {
        const res = await fetch('http://localhost:3000/api/send-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url,
                method,
                headers,
                body,
            }),
        });

        const data = await res.json();
        responseContainer.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
        responseContainer.textContent = `Error: ${err.message}`;
    }
});
