function obrigatorio(text) {
  return text.trim() !== "";
}

$(function() {
  $("#cpf").validador();

  $("#obrigatorio").validador({function: obrigatorio});
});