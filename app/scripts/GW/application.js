GW = GW || {};
GW.namespace('application');

GW.application = function() {

    var handleMediaViewer = function() {
        var $videoContainer = $('.videoContainer');

        /* This is to handle the problem in chrome where video is rendering above lightbox - might get fixed in an update to chrome
        * in which case this will be not needed any more (i.e. this is a kludge) */
        /*$('.lb_storyPics').click(function(){
            $videoContainer.css('visibility','hidden');
            $("html:not(:animated),body:not(:animated)").animate({scrollTop: 0}, 500);
        });
        $('#ui-lightbox-overlay, #ui-lightbox-header-close').live('click',function(){
            $videoContainer.css('visibility','visible');
        });*/

        $('.thumbsList').magnificPopup({
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image', // other options
            gallery:{enabled:true}
        });
        
    };

    /*
    * PAGE LOAD
    * */
    var load = function() {
        if ($('body').hasClass('home')) {
            GW.home.load();
        } else {
            $('.videoContainer').fitVids();
            /*$('.lb_storyPics').rlightbox({
                errorMessage: 'Uh oh... There was a problem loading that image. We\'ll send in the fishes to fix it.',
                counterDelimiter: ' of '
            });*/
            handleMediaViewer();

        }
    };

    return {
        load : load
    };

}();
