
//Javascript to stop carousel sliding timer
$('.carousel').carousel({
    interval: false
}); 

//Javascript for the navbar
$(function () {
    $(document).scroll(function () {
        var $nav = $("#mainNavbar");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
});