import "./common";

(() => {
  let turnstileWidgetId = null;
  let turnstileSuccess = false;

  const form = document.getElementById("contact-form");
  const error = document.getElementById("contact-error");
  const success = document.getElementById("contact-success");
  const button = document.getElementById("contact-submit");
  const widget = document.getElementById("cf-turnstile");
  const sitekey = widget.getAttribute("data-sitekey");

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const children = document.getElementById("children");
  const message = document.getElementById("message");

  function validate() {
    if (name.validity.valid && email.validity.valid && turnstileSuccess) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "disabled");
    }
  }

  function handleSuccess() {
    resetForm();
    success.classList.remove("hidden");
  }

  function handleError(/*cause*/) {
    resetTurnstile();
    button.textContent = "Send";
    button.removeAttribute("disabled");
    error.classList.remove("hidden");
  }

  function resetTurnstile() {
    if (turnstileWidgetId) {
      turnstile.reset(turnstileWidgetId);
    }
  }

  function resetForm() {
    resetTurnstile();
    success.classList.add("hidden");
    error.classList.add("hidden");
    button.textContent = "Send";
    button.setAttribute("disabled", "disabled");
    name.value = "";
    email.value = "";
    children.value = "";
    message.value = "";
  }

  name.addEventListener("input", validate);
  email.addEventListener("input", validate);
  children.addEventListener("input", validate);
  message.addEventListener("input", validate);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    button.setAttribute("disabled", "disabled");
    button.textContent = "Sending...";
    success.classList.add("hidden");
    error.classList.add("hidden");

    try {
      const response = await fetch("/contact-submit", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const data = await response.json();

      // Edge function will always throw an error if something goes wrong
      // But we can still look for success here as a sanity check
      if (data.success) {
        handleSuccess();
      } else {
        handleError(["unknown"]);
      }
    } catch (error) {
      handleError(error.cause);
    }
  });

  window.onloadTurnstileCallback = function () {
    turnstileWidgetId = turnstile.render(widget, {
      sitekey,
      callback: function (/*token*/) {
        turnstileSuccess = true;
      },
    });
  };
})();
