// Função para criptografar
function encrypt(text, shift) {
  return text
    .split("")
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const shiftedCode = ((code - 97 + shift) % 26) + 97;
        return String.fromCharCode(shiftedCode);
      }
      return char;
    })
    .join("");
}

// Função para descriptografar
function decrypt(text, shift) {
  return text
    .split("")
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const shiftedCode = ((code - 97 - shift + 26) % 26) + 97;
        return String.fromCharCode(shiftedCode);
      }
      return char;
    })
    .join("");
}

// Função para validar o texto de entrada
function validateInputText(text) {
  const regex = /^[a-z\s]+$/;

  // Verifica se há caracteres maiúsculos ou especiais na string
  if (!regex.test(text)) {
    return false;
  }

  // Verifica individualmente se cada caractere é minúsculo
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    // Considera apenas caracteres ASCII que não são letras minúsculas
    if ((charCode < 97 || charCode > 122) && charCode !== 32) {
      return false;
    }
  }

  return true;
}

// Função para copiar texto para a área de transferência usando a API Clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Texto copiado com sucesso para a área de transferência.");
  } catch (err) {
    console.error("Erro ao copiar o texto para a área de transferência:", err);
  }
}

// Manipulação do DOM
document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("input-text");
  const criptoBtn = document.getElementById("cripto-btn");
  const descriptoBtn = document.getElementById("descripto-btn");
  const outputText = document.getElementById("output-text");
  const copyBtn = document.getElementById("copy-btn");
  const infoDiv = document.querySelector(".info");
  const outputOffDiv = document.querySelector(".output-off");
  const outputOnDiv = document.querySelector(".output-on");

  criptoBtn.addEventListener("click", () => {
    const isValid = validateInputText(inputText.value);

    if (isValid) {
      const shiftedText = encrypt(inputText.value, 3);
      outputText.value = shiftedText;

      outputOnDiv.style.display = "block";
      outputOffDiv.style.display = "none";
      infoDiv.style.display = "none";
    } else {
      infoDiv.style.display = "block";
    }
  });

  descriptoBtn.addEventListener("click", () => {
    const originalText = decrypt(outputText.value, 3);
    outputText.value = originalText;

    outputOnDiv.style.display = "block";
    outputOffDiv.style.display = "none";
  });

  copyBtn.addEventListener("click", () => {
    copyToClipboard(outputText.value);
  });
});
