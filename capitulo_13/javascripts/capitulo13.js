function obrigatorio(text) {
  console.log(text, text.trim() !== "");
  return text.trim() !== "";
}

$(function() {
  $("#cpf").validador();

  $("#obrigatorio").validador({function: obrigatorio});
});