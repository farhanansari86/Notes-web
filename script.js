const noteText = document.getElementById("noteText");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

addNoteBtn.addEventListener("click", addNote);

function addNote() {
  if (noteText.value.trim() === "") return;

  notes.push(noteText.value);
  noteText.value = "";
  saveNotes();
  displayNotes();
}

function displayNotes() {
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    const textarea = document.createElement("textarea");
    textarea.value = note;
    textarea.addEventListener("change", () => editNote(index, textarea.value));

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(index));

    actionsDiv.appendChild(deleteBtn);
    noteDiv.appendChild(textarea);
    noteDiv.appendChild(actionsDiv);

    notesList.appendChild(noteDiv);
  });
}

function editNote(index, newText) {
  notes[index] = newText;
  saveNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  displayNotes();
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Initial load
displayNotes();
