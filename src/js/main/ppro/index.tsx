import { csi } from "../../lib/utils/bolt";
import React, { useState } from "react";
import { Character, Store } from "./store";
import { CharacterConfig } from "./components/characterConfig";

const Ppro = () => {
  const host = csi.hostEnvironment.appName;

  const [characterConfigs, setCharacterConfigs] = useState<
    Store["setting"]["characters"]
  >({
    ずんだもん: {
      name: "ずんだもん",
      lipSyncMogrtPath: "",
      lipSyncVidTrackIndex: 0,
      voiceTrackIndex: 0,
    },
  });

  // update characterConfigs by character name
  const updateCharacterConfigs = (characterName: string, config: Character) => {
    const newCharacterConfigs = { ...characterConfigs };
    newCharacterConfigs[characterName] = config;
    setCharacterConfigs(newCharacterConfigs);
  };

  const characterConfigUpdater = (characterName: string) => {
    return (config: Character) => {
      updateCharacterConfigs(characterName, config);
    };
  };

  return (
    <div className={"mx-2"}>
      <h1>{host}</h1>
      <h1>Premiere Pro</h1>

      <div>
        <h2>キャラクター</h2>
      </div>

      {Object.entries(characterConfigs).map(([characterName, config]) => (
        <CharacterConfig
          character={config}
          setCharacter={characterConfigUpdater(characterName)}
        />
      ))}
    </div>
  );
};

export default Ppro;
