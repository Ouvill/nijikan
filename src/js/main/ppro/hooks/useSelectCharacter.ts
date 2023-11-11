import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { v4 as uuidv4 } from "uuid";
import { actions as characterActions } from "../store/settings/characters";
import { selectedCharacterActions } from "../store/settings/selectedCharacter";
import {
  characterCollectionSelector,
  selectedCharacterSelector,
} from "../store/settings/selectors";

export const useSelectCharacter = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(characterCollectionSelector);
  const selectedCharacterId = useAppSelector(selectedCharacterSelector);

  const selectCharacter = (id: string) => {
    dispatch(selectedCharacterActions.setSelectedCharacter(id));
  };

  const addCharacter = () => {
    const id = uuidv4();
    dispatch(characterActions.addCharacter(id));
    dispatch(selectedCharacterActions.setSelectedCharacter(id));
  };

  const removeSelectedCharacter = () => {
    const characterIds = Object.keys(characters);
    const index = characterIds.indexOf(selectedCharacterId);
    const nextIndex = index === 0 ? 1 : index - 1;
    const nextId = characterIds[nextIndex];
    dispatch(characterActions.removeCharacter(selectedCharacterId));
    if (nextId) {
      dispatch(selectedCharacterActions.setSelectedCharacter(nextId));
    } else {
      dispatch(selectedCharacterActions.setSelectedCharacter(""));
    }
  };

  return {
    selectedCharacterId,
    selectCharacter,
    addCharacter,
    removeSelectedCharacter,
  };
};
