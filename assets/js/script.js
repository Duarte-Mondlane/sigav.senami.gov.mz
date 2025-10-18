document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // impede o envio automático

    let valid = true; // controla se o formulário está válido

    // limpar mensagens antigas
    const errors = form.querySelectorAll(".error-message");
    errors.forEach(e => e.remove());

    // verificar todos os campos obrigatórios
    form.querySelectorAll("[required]").forEach(field => {
      if (field.value.trim() === "") {
        valid = false;

        // criar mensagem de erro
        const error = document.createElement("p");
        error.textContent = "⚠ Este campo é obrigatório.";
        error.classList.add("error-message");
        error.style.color = "red";
        error.style.fontSize = "0.9rem";
        error.style.marginTop = "0.25rem";

        // inserir logo abaixo do campo
        field.insertAdjacentElement("afterend", error);

        // destacar campo
        field.style.borderColor = "red";
      } else {
        field.style.borderColor = "#ccc"; // volta ao normal
      }
    });

    if (valid) {
      submitBtn.textContent = "Submetido com sucesso!";
      submitBtn.style.backgroundColor = "green";
      submitBtn.style.color = "white";
      submitBtn.disabled = true; // evita novo clique

      // opcional: resetar o formulário depois de 2s
      setTimeout(() => {
        form.reset();
        submitBtn.textContent = "Submeter";
        submitBtn.style.backgroundColor = "";
        submitBtn.disabled = false;
      }, 2500);
    }
  });

  // evento para remover erro quando o utilizador começar a digitar
  form.querySelectorAll("[required]").forEach(field => {
    field.addEventListener("input", function () {
      const next = field.nextElementSibling;
      if (next && next.classList.contains("error-message")) {
        next.remove();
        field.style.borderColor = "#ccc";
      }
    });
  });
});
