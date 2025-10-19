document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const submitBtn = document.getElementById("submitBtn");

  // função para mostrar erro
  function mostrarErro(field, mensagem) {
    // apaga erro antigo
    const antigo = field.nextElementSibling;
    if (antigo && antigo.classList.contains("error-message")) {
      antigo.remove();
    }

    // cria mensagem nova
    const erro = document.createElement("p");
    erro.textContent = mensagem;
    erro.classList.add("error-message");
    erro.style.color = "red";
    erro.style.fontSize = "0.9rem";
    erro.style.marginTop = "0.25rem";
    const proximoP = field.nextElementSibling;
  if (proximoP && proximoP.tagName.toLowerCase() === "p") {
    proximoP.insertAdjacentElement("afterend", erro);
  } else {
    field.insertAdjacentElement("afterend", erro);
  }
    field.style.borderColor = "red";
  }

  // função para limpar erro
  function limparErro(field) {
    const proximo = field.nextElementSibling;
    if (proximo && proximo.classList.contains("error-message")) {
      proximo.remove();
    }
    field.style.borderColor = "#ccc";
  }

  // verificação individual de cada campo
  form.querySelectorAll("[required]").forEach(field => {
    // quando sair do campo (blur)
    field.addEventListener("blur", function () {
      if (field.value.trim() === "") {
        mostrarErro(field, "Campo obrigatório / Required field / Champ obligatoire");
      } else {
        limparErro(field);
      }
    });

    // quando o utilizador começa a digitar ou mudar select
    field.addEventListener("input", function () {
      limparErro(field);
    });

    field.addEventListener("change", function () {
      limparErro(field);
    });
  });

  // verificação final ao submeter
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let valido = true;

    form.querySelectorAll("[required]").forEach(field => {
      if (field.value.trim() === "") {
        mostrarErro(field, "⚠ Este campo é obrigatório.");
        valido = false;
      }
    });

    if (valido) {
      submitBtn.textContent = "Submetido com sucesso!";
      submitBtn.style.backgroundColor = "green";
      submitBtn.style.color = "white";
      submitBtn.disabled = true;

      setTimeout(() => {
        form.reset();
        submitBtn.textContent = "Submeter";
        submitBtn.style.backgroundColor = "";
        submitBtn.style.color = "";
        submitBtn.disabled = false;
        form.querySelectorAll("[required]").forEach(f => limparErro(f));
      }, 2500);
    }
  });
  // ---- ADICIONA ISSO DENTRO do document.addEventListener("DOMContentLoaded", ...) ----

// 1️⃣ Criar o toast
const toast = document.createElement("div");
toast.textContent = "Submetido com sucesso!";
toast.id = "toast";
document.body.appendChild(toast);

// 2️⃣ Estilo do toast
Object.assign(toast.style, {
  visibility: "hidden",
  minWidth: "220px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  textAlign: "center",
  borderRadius: "6px",
  padding: "12px",
  position: "fixed",
  bottom: "30px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: "9999",
  opacity: "0",
  transition: "opacity 0.5s, visibility 0.5s"
});

// 3️⃣ Função para mostrar toast
function mostrarToast() {
  toast.style.visibility = "visible";
  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.visibility = "hidden";
  }, 2000);
}

// 4️⃣ Ativar botão quando todos os campos estiverem válidos
const campos = form.querySelectorAll("[required]");
form.addEventListener("input", () => {
  const todosPreenchidos = Array.from(campos).every(
    campo => campo.value.trim() !== ""
  );

  if (todosPreenchidos) {
    submitBtn.style.backgroundColor = "green";
    submitBtn.style.cursor = "pointer";
  } else {
    submitBtn.style.backgroundColor = "";
    submitBtn.style.cursor = "not-allowed";
  }
});

// 5️⃣ Mostrar toast e redirecionar após sucesso
form.addEventListener("submit", function (event) {
  if (submitBtn.textContent === "Submetido com sucesso!") {
    mostrarToast();
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  }
});

});
