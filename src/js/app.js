/* app logic, injected into footer part */

$(function(){ //DOM Ready

   var brick;
   var inBetween = false;
    brick = "<div class='brick small'><div class='delete'>&times;</div></div>";
/*
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
//      return $('.gridly').gridly('layout');
    });
*/ 
/*
  $('.gridly').gridly({
    base: 50, // px 
    gutter: 5, // px
    columns: 20,
    reordering: function (elm) {
    	console.dir(elm);
    	$('.example').css('backgroundColor', '#caa');
    },
    reordered: function (elm) {
    	$('.example').css('backgroundColor', '#ccc');
    }
  });
*/
  $('.clix').bind('mousedown', function(e){
    inBetween = true;
	$('.example').css('border', '1px dashed #c00');
  });
  $('.clix').bind('mouseup', function(e){
    inBetween = false;
	$('.example').css('border', 'none');
  });
	
	$('.gridly').gridly({
		base: 50, 
		gutter: 5,
		columns: 20		
	});

	$('.wireframe').colResizable({
		minWidth: 10,
		gripInnerHtml: "<div class='rangeGrip'></div>",
		liveDrag:true,

	});

});