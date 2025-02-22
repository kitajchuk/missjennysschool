(() => {
  // The liquid template applies default {{ "now" | date: "%Y" }}
  // but we need to progressively enhance it to update the year
  // when the page is loaded since we use static generation
  const year = document.getElementById("year");
  year.textContent = new Date().getFullYear();
})();
