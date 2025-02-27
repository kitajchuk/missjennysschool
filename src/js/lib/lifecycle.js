export const getLifecycle = ({
  cycleLength = 0,
  cycleInterval = 6000,
  onNewCycle = () => {},
}) => {
  let index = 0;
  let interval = null;

  function updateIndex() {
    index = (index + 1) % cycleLength;
    return index;
  }

  function startInterval() {
    stopInterval();
    interval = setInterval(() => {
      onNewCycle(index);
    }, cycleInterval);
  }

  function stopInterval() {
    clearInterval(interval);
    interval = null;
  }

  return {
    startInterval,
    stopInterval,
    updateIndex,
  };
};
