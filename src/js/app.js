/* app logic, injected into footer part */

function mk_love_post() {

  "use strict";

  $('body').on('click', '.mk-love-this', function () {
    var $this = $(this),
      $id = $this.attr('id');

    if ($this.hasClass('item-loved')) return false;

    if ($this.hasClass('item-inactive')) return false;

    var $sentdata = {
      action: 'mk_love_post',
      post_id: $id
    }

    $.post(ajaxurl, $sentdata, function (data) {
      $this.find('.mk-love-count').html(data);
      $this.addClass('item-loved');
    });

    $this.addClass('item-inactive');
    return false;
  });

}