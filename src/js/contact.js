(() => {
  let turnstileSuccess = false;

  const form = document.getElementById("contact-form");
  const widget = document.getElementById("cf-turnstile");
  const sitekey = widget.getAttribute("data-sitekey");

  const button = document.getElementById("contact-submit");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const children = document.getElementById("children");
  const message = document.getElementById("message");

  const validate = () => {
    if (name.validity.valid && email.validity.valid && turnstileSuccess) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "disabled");
    }
  };

  name.addEventListener("input", validate);
  email.addEventListener("input", validate);
  children.addEventListener("input", validate);
  message.addEventListener("input", validate);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch("/contact-submit", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const data = await response.json();
      // TODO: Success handling in UI
      console.log({ data });
    } catch (error) {
      // TODO: Error handling in UI
      console.error(error);
    }
  });

  window.onloadTurnstileCallback = function () {
    turnstile.render(widget, {
      sitekey,
      callback: function (/*token*/) {
        turnstileSuccess = true;
      },
    });
  };
})();
