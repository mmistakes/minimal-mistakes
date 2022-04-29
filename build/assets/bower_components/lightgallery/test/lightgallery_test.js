(function($) {

    module('lightGallery');

    /*test('should be chainable', function() {
        var elem = document.createElement('div');
        ok($(elem).lightGallery().addClass('testing'), 'can be chained');
        equal($(elem).attr('class'), 'testing', 'class was added correctly from chaining');
    });*/

    test('$item should take corrent value', function() {
        ok($.fn.lightGallery, 'options set up correctly');
    });

}(jQuery));

