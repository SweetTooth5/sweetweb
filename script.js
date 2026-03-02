// Load notes from local storage when page opens
document.addEventListener("DOMContentLoaded", displayNotes);

function addNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    if (!title || !content) {
        alert("Please fill in both title and content!");
        return;
    }

    const note = { title, content, id: Date.now() };

    // Get existing notes or start empty array
    const notes = JSON.parse(localStorage.getItem('sweettooth_notes') || '[]');
    notes.push(note);
    localStorage.setItem('sweettooth_notes', JSON.stringify(notes));

    // Clear inputs and refresh display
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    displayNotes();
}

function displayNotes() {
    const notesDisplay = document.getElementById('notesDisplay');
    const notes = JSON.parse(localStorage.getItem('sweettooth_notes') || '[]');
    
    notesDisplay.innerHTML = '';

    notes.forEach(note => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="deleteNote(${note.id})" style="background: #ff4d4d; color: white; padding: 5px 10px; font-size: 12px;">Delete</button>
        `;
        notesDisplay.appendChild(card);
    });
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem('sweettooth_notes') || '[]');
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem('sweettooth_notes', JSON.stringify(notes));
    displayNotes();
}
