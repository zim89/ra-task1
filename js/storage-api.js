import initialData from '../data/data.json';

const STORAGE_KEY = 'zi-tasks';

const initLocalStorage = () =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));

const loadTasksFromLS = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? initLocalStorage());
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const loadTasks = async () => {
  try {
    const savedTasks = await loadTasksFromLS();
    return savedTasks;
  } catch (e) {
    console.error(e);
    return [];
  }
};
