
import { LocalAreaData } from '../types/local-area';
import { defaultLocalAreaData } from '../data/default-local-area-data';

// Storage key
const STORAGE_KEY = 'localAreaData';

// Functions to get and set local area data
export const getLocalAreaData = (): LocalAreaData => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : defaultLocalAreaData;
};

export const saveLocalAreaData = (data: LocalAreaData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
