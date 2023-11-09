export const getTrackEndTime = (track: Track) => {
    const num = track.clips.numItems;
    if (num === 0) {
        return new Time();
    }
    return track.clips[num - 1].end;
};