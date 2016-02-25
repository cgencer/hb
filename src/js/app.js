/* app logic, injected into footer part */

$(function(){ //DOM Ready

   var brick;
    brick = "<div class='brick small'><div class='delete'>&times;</div></div>";
    $(document).on("click touchend", ".gridly .brick", function(event) {
      var $this, size;
      event.preventDefault();
      event.stopPropagation();
      $this = $(this);
      $this.toggleClass('small');
      $this.toggleClass('large');
      if ($this.hasClass('small')) {
        size = 140;
      }
      if ($this.hasClass('large')) {
        size = 300;
      }
      $this.data('width', size);
      $this.data('height', size);
      return $('.gridly').gridly('layout');
    });
  $('.gridly').gridly({
    base: 60, // px 
    gutter: 20, // px
    columns: 12
  });
});