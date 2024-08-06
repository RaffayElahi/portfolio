document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const feedbackElement = document.getElementById("form-feedback");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch("/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.errors) {
          feedbackElement.className = "form-feedback error";
          feedbackElement.textContent = `${result.errors
            .map((error) => error.msg)
            .join(", ")}`;
          feedbackElement.style.display = "block";
        } else {
          window.location.href = "/thanks";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        feedbackElement.className = "form-feedback error";
        feedbackElement.textContent =
          "An error occurred while submitting the form.";
        feedbackElement.style.display = "block";
      });
  });
});
