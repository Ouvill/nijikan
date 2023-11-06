const localStorageKey = "selectedCharacterId";

export const saveSelectedCharacterIdToLocalStorage = (id: string) => {
  localStorage.setItem(localStorageKey, id);
};

export const loadSelectedCharacterIdFromLocalStorage = (): string => {
  const id = localStorage.getItem(localStorageKey);
  if (id) {
    return id;
  }
  return "";
};
