import initialData from '../data/data.json';
import { parseISO, format } from 'date-fns';
import { nanoid } from 'nanoid';

const STORAGE_KEY = 'zi-notes';

export const initLocalStorage = () => {
  const init = loadNotesFromLS();
  init.length === 0
    ? localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
    : null;
};

const loadNotesFromLS = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const loadNotes = () => {
  try {
    const savedNotes = loadNotesFromLS();
    return savedNotes;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const saveNotes = data => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const addNote = e => {
  const { name, category, content, date } = e.currentTarget;
  const dates = [];
  date.value ? dates.push(format(parseISO(date.value), 'yyyy.MM.dd')) : null;
  const newNote = {
    id: nanoid(),
    name: name.value,
    created_at: format(Date.now(), 'yyyy.MM.dd'),
    category: category.value,
    content: content.value,
    isArchived: false,
    dates,
  };
  const savedNotes = loadNotes();
  savedNotes.push(newNote);
  saveNotes(savedNotes);
};

export const deleteNote = id => {
  const data = loadNotes().filter(note => note.id != id);
  saveNotes(data);
};

export const archiveNote = id => {
  const note = loadNotes().find(note => note.id === id);
  note.isArchived = !note.isArchived;
  deleteNote(id);
  const data = loadNotes();
  data.push(note);
  saveNotes(data);
};

export const editNote = (e, id) => {
  const note = loadNotes().find(note => note.id === id.dataset.id);

  const { name, category, content, date } = e.currentTarget;
  const dates = [...note.dates];

  date.value ? dates.push(format(parseISO(date.value), 'yyyy.MM.dd')) : null;
  const editNote = {
    ...note,
    name: name.value,
    category: category.value,
    content: content.value,
    dates,
  };
  const newData = loadNotes().filter(note => note.id !== id.dataset.id);
  newData.push(editNote);
  saveNotes(newData);
};
