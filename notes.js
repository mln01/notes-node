const fs = require("fs");

module.exports.addNote = (title, body) => {
  var notes = this.fetchNotes();
  var note = {
    title,
    body,
  };
  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    this.saveNotes(notes);
    return note;
  }
};

module.exports.getAll = () => {
  return this.fetchNotes();
};

module.exports.getNote = (title) => {
  var notes = this.fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};

module.exports.removeNote = (title) => {
  var notes = this.fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  this.saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
};

module.exports.fetchNotes = () => {
  try {
    var notesString = fs.readFileSync("./notes-data.json");
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

module.exports.saveNotes = (notes) => {
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

module.exports.logNote = (note) => {
  console.log(`---\nTitle: ${note.title}\nBody: ${note.body}`);
};
