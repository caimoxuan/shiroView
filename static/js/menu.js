$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });
  //给dropdown下的li下的a标签(就是dropdown的下拉标签)添加阻止事件传播的方法。在a标签中添加data-stopPropagation = "true"是一样的效果
  $('.dropdown').find("li").find("a").each(function(){
	 $(this).on("click", this, function(e){
		e.stopPropagation();
	 });
  });
  
});