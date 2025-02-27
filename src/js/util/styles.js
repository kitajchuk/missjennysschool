export const getTransitionDuration = (element) => {
  const styles = getComputedStyle(element);
  const transitionDuration = styles.transitionDuration;
  const transitionDurationMs = transitionDuration.replace("s", "") * 1000;
  return transitionDurationMs;
};

export const getPropertyValue = (element, property) => {
  const styles = getComputedStyle(element);
  return styles.getPropertyValue(property);
};
