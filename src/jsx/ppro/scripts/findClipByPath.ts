export const findClipByPath = (track: Track, path: string) => {
    const num = track.clips.numItems;
    for (let i = 0; i < num; i++) {
        const clip = track.clips[i];
        const clipPath = clip.projectItem.getMediaPath();
        if (clipPath === path) {
            return clip;
        }
    }
};