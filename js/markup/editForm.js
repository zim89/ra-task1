export const createEditFormMarkup = () => {
  return `
    <div class="row mt-2">
    <div class="col-8">
      <label for="name" class="form-label">Note name</label>
      <input type="text" class="form-control" id="name" required />
    </div>
    <div class="col-4">
      <label for="category" class="form-label">Category</label>
      <select class="form-select" id="category" aria-label="select">
        <option value="Task">Task</option>
        <option value="Quote">Quote</option>
        <option value="Idea">Idea</option>
        <option value="Random thing">Random Thought</option>
      </select>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col-8">
      <label for="content" class="form-label">Note content</label>
      <input type="text" class="form-control" id="content" required />
    </div>
    <div class="col-4">
      <label for="dates" class="form-label">Dates</label>
      <input type="text" id="dates" class="form-control" readonly/>
    </div>
  </div>
  <div class="row mt-2">
  <div class="col-4">
    <label for="date" class="form-label">Set new Date</label>
    <input type="date" id="date" class="form-control" />
    </div>
  </div>

  <button class="btn btn-sm btn-success mt-4" type="submit">
    Save Note
  </button>
  `;
};
