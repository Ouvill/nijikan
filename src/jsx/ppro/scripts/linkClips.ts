export function linkClips(clips: TrackItem[], seq: Sequence) {
    const selections = seq.getSelection();

    // unselect all
    for (let i = 0; i < selections.length; i++) {
        selections[i].setSelected(false, true);
    }

    // select clips
    for (let i = 0; i < clips.length; i++) {
        clips[i].setSelected(true, true);
    }

    // link
    seq.linkSelection();
}