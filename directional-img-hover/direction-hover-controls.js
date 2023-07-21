// when the DOM is fully loaded
$(document).ready( function() {

    // set up a mouseenter event handler for elements with class "card"
    $('.card').on('mouseenter', function(e) {

        // calculate the mouse coordinates
        x = e.pageX - $(this).offset().left,
        y = e.pageY - $(this).offset().top;

        // select all span elements that are descendants of the current element
        // and set their top and left CSS properties to the mouse coordinates
        $(this).find('span').css({ top: y, left: x});
    });

    // set up a mouseout event handler for elements with class "card"
    $('.card').on('mouseout', function(e) {

        // calculate the mouse coordinates
        x = e.pageX - $(this).offset().left,
        y = e.pageY - $(this).offset().top;

        // select all span elements that are descendants of the current element
        // and set their top and left CSS properties to the mouse coordinates
        $(this).find('span').css({ top: y, left: x});
    });
});