// characterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { CharacterSpec } from "../pages/characters/[id]";

export interface Character {
  id: number;
  name: string;
}

interface CharacterState {
  characters: CharacterSpec[];
}

const initialState: CharacterState = {
  characters: [],
};

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addCharacter(state, action: PayloadAction<CharacterSpec>) {
      state.characters.push(action.payload);
    },
    deleteCharacter(state, action: PayloadAction<number>) {
      state.characters = state.characters.filter(
        (char) => char.id !== action.payload
      );
    },
  },
});

export const { addCharacter, deleteCharacter } = characterSlice.actions;
export const selectCharacters = (state: RootState) =>
  state.characters.characters;
export default characterSlice.reducer;
