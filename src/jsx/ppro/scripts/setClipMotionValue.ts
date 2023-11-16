import { ComponentMatchName, MediaTypes } from "../constant";

/**
 * Function to set the motion value of a selected clip in Premiere Pro.
 *
 * @param {Object} params - The parameters for the function.
 * @param {Sequence} params.seq - The active sequence in the Premiere Pro project.
 * @param {TrackItem} params.clip - The selected clip in the sequence.
 * @param {number} params.x - The new x position for the clip.
 * @param {number} params.y - The new y position for the clip.
 * @param {number} params.scale - The new scale for the clip.
 */
export const setClipMotionValue = ({
  seq,
  clip,
  position,
  scale,
}: {
  seq: Sequence;
  clip: TrackItem;
  position: {
    x: number;
    y: number;
  };
  scale: number;
}) => {
  // Check if the clip is a video clip
  if (clip.type !== MediaTypes.VIDEO) return;

  // Get the components of the clip
  const components: ComponentCollection = clip.components;
  const num = components.numItems;

  // Loop through the components
  for (let i = 0; i < num; i++) {
    // Check if the component is a "Motion" component
    if (components[i].matchName === ComponentMatchName.Motion) {
      // Get the "Position" property of the component
      const positionComp = components[i].properties[0];

      // Calculate the new position value based on the sequence frame size
      const positionValue = [
        position.x / seq.frameSizeHorizontal,
        position.y / seq.frameSizeVertical,
      ];

      // Set the new position value
      positionComp.setValue(positionValue);

      // Get the "Scale" property of the component
      const scaleParam = components[i].properties[1];

      // Set the new scale value
      scaleParam.setValue(scale, true);

      return;
    }
  }
};
