// --- DOM Elements ---
const inviteKeyInput = document.getElementById('inviteKeyInput');
const submitKeyButton = document.getElementById('submitKeyButton');
const statusMessage = document.getElementById('statusMessage');
const copyrightButton = document.getElementById('copyrightButton');
const adminModal = document.getElementById('adminModal');
const retrieveKeysButton = document.getElementById('retrieveKeysButton');
const adminPasswordInput = document.getElementById('adminPasswordInput');
const keysList = document.getElementById('keysList');
const keyCount = document.getElementById('keyCount');
const getKeysButton = document.getElementById('getKeysButton');

// --- Visual Functions ---

// Function to open the Admin Modal when 'Copyright' is clicked
copyrightButton.addEventListener('click', () => {
    adminModal.style.display = 'flex';
    keysList.innerHTML = '';
    keyCount.textContent = 'Awaiting password...';
    adminPasswordInput.value = '';
});

// Function to close the Admin Modal
function closeAdminModal() {
    adminModal.style.display = 'none';
}

// Making the 'Get Keys' button do nothing, as requested
getKeysButton.addEventListener('click', () => {
    console.log("The 'Get Keys' button was clicked, but is non-functional.");
    // No code is executed here as requested by Alpha.
});


// --- Backend Function Stubs (Requires Netlify Functions/FaunaDB Setup) ---

// 1. Logic to store the key and redirect
submitKeyButton.addEventListener('click', async () => {
    const key = inviteKeyInput.value.trim();
    if (!key) {
        statusMessage.textContent = 'Please enter a key.';
        return;
    }

    statusMessage.textContent = 'Key accepted. Redirecting...';
    // In a real setup, this is where you'd call your Netlify Function API:
    /*
    const response = await fetch('/.netlify/functions/store-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: key, timestamp: new Date().toISOString() })
    });
    // After successful storage, you would redirect the user:
    */

    // TEMPORARY: Redirect to the mock 'bal no' GUI page (create 'bal_no.html' later)
    window.location.href = 'bal_no.html'; 
});


// 2. Logic to retrieve the keys
retrieveKeysButton.addEventListener('click', async () => {
    const password = adminPasswordInput.value.trim();
    if (!password) {
        alert('Password is required.');
        return;
    }

    keyCount.textContent = 'Attempting retrieval...';
    
    // In a real setup, this is where you'd call your Netlify Function API:
    /*
    const response = await fetch('/.netlify/functions/retrieve-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password })
    });
    
    if (response.ok) {
        const data = await response.json();
        displayKeys(data.keys);
    } else {
        keyCount.textContent = 'ERROR: Invalid password or retrieval failed.';
    }
    */
    
    // TEMPORARY MOCK DATA for visual testing
    if (password === 'alpha_z_123') { // Replace 'alpha_z_123' with your actual password in the final API
        const mockKeys = [
            { key: 'A7B8C9D0E1F2G3H4', timestamp: '2025-10-06T10:00:00Z' },
            { key: 'Z9Y8X7W6V5U4T3S2', timestamp: '2025-10-06T10:05:30Z' }
        ];
        displayKeys(mockKeys);
    } else {
        keyCount.textContent = 'ERROR: Invalid password.';
    }
});


// 3. Function to display the retrieved keys
function displayKeys(keys) {
    keysList.innerHTML = '';
    keyCount.textContent = `Found ${keys.length} Keys:`;
    
    keys.forEach(item => {
        const div = document.createElement('div');
        const formattedTimestamp = new Date(item.timestamp).toLocaleString();
        div.innerHTML = `<strong>Key:</strong> ${item.key}<br><strong>Time:</strong> ${formattedTimestamp}`;
        keysList.appendChild(div);
    });
}
