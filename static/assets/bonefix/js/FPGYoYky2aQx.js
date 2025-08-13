$("a[href*='#']:not([href='#'])").click(function(e) {
    e.preventDefault();
});

$('a[href^="#"]').click(function () {
    var fullHref = $(this).attr("href");
    var elementClick = fullHref.split('?')[0];

    if($(elementClick).length) {
        var destination = $(elementClick).offset().top - 60;
        jQuery("html:not(:animated), body:not(:animated)").animate(
            { scrollTop: destination },
            800
        );
    }
    return false;
});