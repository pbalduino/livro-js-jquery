$(function(){
	var $lastClicked;

	function onTaskDeleteClick() {
		$(this).parent('.task-item')
			.unbind('click')
			.hide('slow')
			.remove();
	}

	function addTask(text) {
		var $task = $("<div />")
									.addClass("task-item")
									.append($("<div />")
													.addClass("task-text")
													.text(text))
									.append($("<div />")
													.addClass("task-delete"))
									.append($("<div />")
													.addClass("clear"));

		$("#task-list").append($task);

		$(".task-delete").click(onTaskDeleteClick);

		$(".task-item").click(onTaskItemClick);
	}

	function onTaskKeydown(event) {
		if(event.keyCode == 13) {
			addTask($("#task").val());
			$("#task").val("");
		}
	}

	function onTaskEditKeydown(event) {
		if(event.keyCode === 13) {
			savePendingEdition($lastClicked);
			$lastClicked = undefined;
		}
	}

	function onTaskItemClick(){
		if(!$(this).is($lastClicked)) {
			if($lastClicked !== undefined) {
				savePendingEdition($lastClicked);
			}

			$lastClicked = $(this);

			var text = $lastClicked.children('.task-text').text();

			var content = "<input type='text' class='task-edit' value='" + 
				text + "'>";

			$lastClicked.html(content);

			$(".task-edit").keydown(onTaskEditKeydown);
		}
	}

	function savePendingEdition($task) {
		var text = $task.children('.task-edit').val();
		$task.empty();
		$task.append("<div class='task-text'>" + text + "</div>")
					.append("<div class='task-delete'>.</div>")
					.append("<div class='clear'></div>");
	}

	$(".task-delete").click(onTaskDeleteClick);

	$(".task-item").click(onTaskItemClick);

	$("#task").keydown(onTaskKeydown);
});