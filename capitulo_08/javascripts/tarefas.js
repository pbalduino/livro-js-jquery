$(function(){
  var meu_login = "seu@email.com";
  var server = "http://livro-capitulo07.herokuapp.com";

  var $lastClicked;

  function updateTarefa(text, id) {
    $.post(server + "/tarefa", {tarefa_id: id, texto: text});
  }
    
  function onTarefaDeleteClick() {
    $(this).parent('.tarefa-item')
      .unbind('click')
      .hide('slow', function() {
        $(this).remove();
      });
  }

  function addTarefa(text, id) {
    id = id || 0;

    var $tarefa = $("<div />")
                  .addClass("tarefa-item")
                  .append($("<div />")
                          .addClass("tarefa-id")
                          .text(id))
                  .append($("<div />")
                          .addClass("tarefa-text")
                          .text(text))
                  .append($("<div />")
                          .addClass("tarefa-delete"))
                  .append($("<div />")
                          .addClass("clear"));

    $("#tarefa-list").append($tarefa);

    $(".tarefa-delete").click(onTarefaDeleteClick);

    $(".tarefa-item").click(onTarefaItemClick);
  }

  function onTarefaKeydown(event) {
    if(event.which === 13) {
      savePendingEdition($lastClicked);
      addTarefa($("#tarefa").val());
      $("#tarefa").val("");
    }
  }

  function onTarefaEditKeydown(event) {
    if(event.which === 13) {
      savePendingEdition($lastClicked);
      $lastClicked = undefined;
    }
  }

  function onTarefaItemClick(){

    if(!$(this).is($lastClicked)) {
      if($lastClicked !== undefined) {
        savePendingEdition($lastClicked);
      }

      $lastClicked = $(this);

      var text = $lastClicked.children('.tarefa-text').text();

      var content = "<input type='text' class='tarefa-edit' value='" + 
        text + "'>";

      $lastClicked.html(content);

      $(".tarefa-edit").keydown(onTarefaEditKeydown);
    }
  
  }

  function savePendingEdition($tarefa) {
    var text = $tarefa.children('.tarefa-edit').val();
    $tarefa.empty();
    $tarefa.append("<div class='tarefa-text'>" + text + "</div>")
          .append("<div class='tarefa-delete'></div>")
          .append("<div class='clear'></div>");

    $(".tarefa-delete").click(onTarefaDeleteClick);

    $tarefa.click(onTarefaItemClick);
  }

function loadTarefas() {
  $("#tarefa").empty();

  $.getJSON(server + "/tarefas", {usuario: meu_login})
    .done(function(data) {
      console.log("data: ", data);
      for(var tarefa = 0; tarefa < data.length; tarefa++) {
        addTarefa(data[tarefa].texto, data[tarefa].id);
      }
    });
}
    
  $(".tarefa-delete").click(onTarefaDeleteClick);

  $(".tarefa-item").click(onTarefaItemClick);

  $("#tarefa").keydown(onTarefaKeydown);

  loadTarefas();
});