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
/*
  $('.clix').bind('mousedown', function(e){
    inBetween = true;
	$('.example').css('border', '1px dashed #c00');
	console.log($(this).attr('id'));
  });
  $('.clix').bind('mouseup', function(e){
    inBetween = false;
	$('.example').css('border', 'none');
  });
*/	
		$('.brick.clix').bind('click', function(e){
			console.log($(this).css('border'));
			if($(this).attr('alt') === ''){
				$(this).css('border', '1px solid #000');
				$(this).attr('alt', 'ON');
			}else{
				$(this).css('border', 'none');
				$(this).attr('alt', '');
			}
//			console.log($(this).css('width'));
		});


		var sortable = Sortable.create(document.getElementById('wireframe'), {
			animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
//			handle: ".brick__title", // Restricts sort start click/touch to the specified element
			draggable: ".brick"
		});

		$('#wf').colResizable({
			minWidth: 25,
			liveDrag: true,

			onDrag: function () {	// fired during the column resizing process if liveDrag is enabled
				console.log('stopping grids');
				sortable.option('disabled', true);
			},
			onResize: function () {	// fired when the dragging process is over
				console.log('starting grids');
				sortable.option('disabled', false);
			}
		});	


	var reordering = function($elements) {
		console.log('ordering.');
	};

	var reordered = function($elements) {
		console.log('ordered.');
	};
/*
	return $('.gridly').gridly({
		base: 50, 
		gutter: 5,
		columns: 20,
		callbacks: { reordering: reordering , reordered: reordered }
	});
*/

});