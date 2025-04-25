export const getLabel = (track: MediaStreamTrack) => {
  const { label } = track;
  const match = label.match(/^(.*)\s-\s(.*)$/);

  if (!match) {
    return label;
  }

  return match[2];
};
