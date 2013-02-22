;(function($) {
  $.fn.validador = function() {
    var init = function() {
      var element = $(this);
      console.log(element.attr("id"));
    }

    return this.each(init);
  };
    
})(jQuery);