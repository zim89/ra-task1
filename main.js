import { createAddFormMarkup } from './js/markup/addForm';
import { createEditFormMarkup } from './js/markup/editForm';
import { createNoteListMarkup } from './js/markup/noteList';
import { createStatsListMarkup } from './js/markup/statList';
import { refs } from './js/refs';
import {
  addNote,
  archiveNote,
  deleteNote,
  editNote,
  initLocalStorage,
  loadNotes,
} from './js/storage-api';
let closestId;

const handlerSubmit = e => {
  e.preventDefault();
  if (e.target.dataset.action === 'add') {
    addNote(e);
    createNoteListMarkup();
    createStatsListMarkup();
    refs.form.reset();
  }

  if (e.target.dataset.action === 'edit') {
    editNote(e, closestId);
    refs.form.innerHTML = createAddFormMarkup();
    refs.form.dataset.action = 'add';
    createNoteListMarkup();
    createStatsListMarkup();
  }
};

const handlerListClick = e => {
  e.preventDefault();
  closestId = e.target.closest('[data-id]');
  const closestAction = e.target.closest('[data-action]');

  if (closestAction.dataset.action === 'delete') {
    deleteNote(closestId.dataset.id);
    createNoteListMarkup();
    createStatsListMarkup();
  }

  if (closestAction.dataset.action === 'archive') {
    archiveNote(closestId.dataset.id);
    createNoteListMarkup();
    createStatsListMarkup();
  }

  if (closestAction.dataset.action === 'edit') {
    refs.form.dataset.action = 'edit';
    const note = loadNotes().find(note => note.id === closestId.dataset.id);

    refs.form.innerHTML = createEditFormMarkup();

    const inputName = document.querySelector('#name');
    const inputCategory = document.querySelector('#category');
    const inputContent = document.querySelector('#content');
    const inputDates = document.querySelector('#dates');

    inputName.value = note.name;
    inputCategory.value = note.category;
    inputContent.value = note.content;
    inputDates.value = note.dates.map(date => date).join(', ');
  }
};

const handlerArchivedCheck = e => {
  createNoteListMarkup();
};

initLocalStorage();
refs.form.innerHTML = createAddFormMarkup();
refs.form.dataset.action = 'add';
createNoteListMarkup();
createStatsListMarkup();

refs.form.addEventListener('submit', handlerSubmit);
refs.list.addEventListener('click', handlerListClick);
refs.archivedCheck.addEventListener('change', handlerArchivedCheck);
