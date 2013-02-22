;(function($) {
  $.fn.validador = function() {
    var init = function() {

      var element = $(this);
        
    	function isValid(text) {
    		return (text === "");
    	}

      function onElementBlur() {
        var texto = element.val();

        if(isValid(texto)) {
          element.removeClass("erro");
          element.addClass("valido");
        } else {
          element.removeClass("valido");
          element.addClass("erro");
        }
      }

      element.bind("blur.validador", onElementBlur);
    }

    return this.each(init);
  };
    
})(jQuery);