// Function to toggle the message box visibility
function toggleMessageBox() {
    const messageBox = document.getElementById('messageBox');
    if (messageBox.style.display === 'block') {
        messageBox.style.display = 'none';
    } else {
        messageBox.style.display = 'block';
    }
}

// Function to submit the message (this will send to Formspree)
function submitMessage() {
    const message = document.getElementById('userMessage').value;
    if (message) {
        // Automatically submits the form (Formspree will handle the message sending)
        const form = document.createElement('form');
        form.action = "https://formspree.io/f/mykdarda";
        form.method = "POST";
        
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'message';
        input.value = message;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
    }
}
