export const compareTime = (a: Time, b: Time) => {
  const aTicks = parseInt(a.ticks);
  const bTicks = parseInt(b.ticks);
  if (aTicks > bTicks) {
    return 1;
  } else if (aTicks < bTicks) {
    return -1;
  }
  return 0;
};