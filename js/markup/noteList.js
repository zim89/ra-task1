import { refs } from '../refs';
import { loadNotes } from '../storage-api';

export const createNoteListMarkup = async () => {
  const data = await loadNotes();
  let sortData;
  refs.archivedCheck.checked
    ? (sortData = data.filter(note => note.isArchived))
    : (sortData = data.filter(note => !note.isArchived));
  sortData.sort((a, b) => b.created_at - a.created_at);
  const markup = sortData
    .map(
      ({ id, name, created_at, category, content, dates, isArchived }) => `
    <tr data-id="${id}" data-archived="${isArchived}">
      <th class="fw-lighter fw-light">${name}</th>
      <th class="fw-lighter fw-light">${created_at}</th>
      <th class="fw-lighter fw-light">${category}</th>
      <th class="fw-lighter fw-light">${content}</th>
      <th class="fw-lighter fw-light">${dates.map(date => date).join(', ')}</th>
      <th class="fw-lighter fw-light">
        <div class="d-grid gap-2 d-md-block">
          <button
            type="button"
            class="btn btn-sm rounded-circle btn-outline-success"
            data-action="edit"
          >
            <i class="bi bi-pencil-square"></i>
          </button>
          <button
            type="button"
            class="btn btn-sm rounded-circle btn-outline-secondary"
            data-action="archive"
          >
            <i class="bi bi-archive"></i>
          </button>
          <button
            type="button"
            class="btn btn-sm rounded-circle btn-outline-danger" 
            data-action="delete"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </th>
    </tr>`
    )
    .join('');
  refs.list.innerHTML = markup;
};
