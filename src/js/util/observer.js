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

export const getResizeObserver = ({ element, onResize = () => {} }) => {
  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      onResize(entry);
    });
  });
  observer.observe(element);
  return observer;
};
