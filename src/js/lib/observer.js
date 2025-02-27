export const getIntersectionObserver = ({
  element,
  onIntersect = () => {},
  onUnintersect = () => {},
}) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onIntersect();
      } else {
        onUnintersect();
      }
    });
  });
  observer.observe(element);
  return observer;
};
