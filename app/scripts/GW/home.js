GW = GW || {};
GW.namespace('home');

GW.home = function() {

    var routes; // the routes for the application

    /*
    * SETS THE HEIGHT OF THE MAIN CONTAINER
    * */
    var setMainHeight = function(animateSpeed) {
        var $main = $('#main'),
                mainHeight = $main.height(),
                newHeight = $(window).height()-30,
                $visibleContentBubble = $('.contentBubble:visible');

        // calculate the new height
        if (newHeight < 580 && ($main.width()>700)) {
            newHeight = 740;
        } else if (newHeight < 330 && ($main.width()<700)) {
            newHeight = 330;
        }

        if ($visibleContentBubble.length && $visibleContentBubble.offset().top < 0) {
            console.log('visible content offset: ',$visibleContentBubble.offset().top);
            newHeight = newHeight + ($visibleContentBubble.offset().top * -1) + 50;
        }

        // animate to the new height
        if (!_.isUndefined(animateSpeed)) {
            $main.animate({
                height: newHeight
            }, animateSpeed);
        } else {
            $main.height(newHeight);
        }
    };


    /*
    * HANDLE THE LINKS FOR THE APP
    * */
    var handleLinks = function() {
        $('#gingerWhale a').on('click',function(){
            var $clicked = $(this),
                    navigateTo = $clicked.attr('href').substr(1);

            if (!$clicked.hasClass('noPush')) {
                if (navigateTo=='TODO') {
                    alert('that\'s not working yet');
                    return false;
                } else {
                    GW.home.routes.navigate(navigateTo, true);
                    return false;
                }
            }

        });
        $('#container .goHome').on('click',function(event){
            var $target = $(event.target);
            if (!$target.hasClass('contentBubble') && !$target.parents('.contentBubble').length) {
                GW.home.routes.navigate('',true);
            }
        });
    };

    /*
    * LOADS THE ABOUT AND SUPPORT CONTENT IF THEY HAVEN'T ALREADY BEEN LOADED
    * */
    var loadContent = function() {
        var $aboutPageContent = $('#aboutPage .contentBubble'),
            $supportPageContent = $('#supportPage .contentBubble'),
            $storiesPageContent = $('#storiesPage .contentBubble'),
            $friendsPageContent = $('#friendsPage .contentBubble');

        if (!$aboutPageContent.hasClass('contentLoaded')) {
            $aboutPageContent.load('/content-store/about.html',function(){
                $aboutPageContent.addClass('contentLoaded');
            });
        }
        if (!$supportPageContent.hasClass('contentLoaded')) {
            $supportPageContent.load('/content-store/support.html',function(){
                $supportPageContent.addClass('contentLoaded');
            });
        }
        if (!$storiesPageContent.hasClass('contentLoaded')) {
            $storiesPageContent.load('/content-store/featured-stories.html',function(){
                $storiesPageContent.addClass('contentLoaded');
            });
        }
        if (!$friendsPageContent.hasClass('contentLoaded')) {
            $friendsPageContent.load('/content-store/friends.html',function(){
                $friendsPageContent.addClass('contentLoaded');
            });
        }
    };

    /*
    * PAGE LOAD
    * */
    var load = function() {
        // set the main height
        setMainHeight();
        $(window).smartresize(function() {
            setMainHeight(100);
        });
        // set up the backbone routes
        GW.home.routes = new GW.AppRoutes();
        Backbone.history.start({pushState:true});
        // load about and support content
        loadContent();
        // handle links (push state)
        handleLinks();
    };

    return {
        load : load,
        routes: routes,
        setMainHeight : setMainHeight
    };

}();
