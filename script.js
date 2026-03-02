// Load data on start
document.addEventListener("DOMContentLoaded", displayNotes);

function addNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    if (!title || !content) {
        alert("Enter both a topic and your notes!");
        return;
    }

    const note = { title, content, id: Date.now() };
    const notes = JSON.parse(localStorage.getItem('sweettooth_data') || '[]');
    notes.push(note);
    localStorage.setItem('sweettooth_data', JSON.stringify(notes));

    // Reset fields
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    displayNotes();
}

function displayNotes() {
    const display = document.getElementById('notesDisplay');
    const notes = JSON.parse(localStorage.getItem('sweettooth_data') || '[]');
    
    display.innerHTML = '';

    notes.forEach(note => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="deleteNote(${note.id})" class="btn-delete">Remove</button>
        `;
        display.appendChild(card);
    });
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem('sweettooth_data') || '[]');
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem('sweettooth_data', JSON.stringify(notes));
    displayNotes();
}
