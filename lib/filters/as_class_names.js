/**
 * Convert a newline separated string of class names into a space separated string of class names.
 * @param {string} classNames - A newline separated string of class names.
 * @returns {string} A space separated string of class names.
 */
export const asClassNames = (classNames) => {
  return classNames
    .split("\n")
    .map((className) => className.trim())
    .join(" ")
    .trim();
};

/* Example usage:

{%
  assign some_classes = "
    cursor-pointer
    hidden
    max-sm:flex
    max-sm:items-baseline
    max-sm:gap-2
    font-serif
    text-coffee
    font-medium
    ml-auto
    relative
    z-20
  " | asClassNames
%}

<button class="{{ some_classes }}">
  Button
</button>

*/
