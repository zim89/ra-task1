import { refs } from '../refs';
import categories from '../../data/category.json';
import { loadNotes } from '../storage-api';

export const createStatsListMarkup = async () => {
  const data = await loadNotes();
  const stats = [];

  categories.forEach(cat => {
    const item = { category: cat.label, active: 0, archived: 0 };
    const filteredData = data.filter(note => note.category === cat.label);
    filteredData.forEach(el => {
      el.isArchived
        ? (item.archived = item.archived + 1)
        : (item.active = item.active + 1);
    });
    stats.push(item);
  });

  const markup = stats
    .filter(el => el.active !== 0 || el.archived !== 0)
    .map(
      ({ category, active, archived }) => `
    <tr>
      <th class="fw-lighter fw-light">${category}</th>
      <th class="fw-lighter fw-light">${active}</th>
      <th class="fw-lighter fw-light">${archived}</th>
    </tr>`
    )
    .join('');
  refs.statList.innerHTML = markup;
};
