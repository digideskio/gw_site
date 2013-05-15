GW = GW || {};
GW.namespace('AppRoutes');

GW.AppRoutes = Backbone.Router.extend({

    initialize: function(){
        console.log('App routes initialised');
        this.$aboutPage = $('#aboutPage');
        this.$supportPage = $('#supportPage');
        this.$storiesPage = $('#storiesPage');
        this.$friendsPage = $('#friendsPage');
    },

    routes: {
        '':                                     'home',
        'about':                                'aboutPageHandler',
        'about/':                               'aboutPageHandler',
        'support':                              'supportPageHandler',
        'support/':                             'supportPageHandler',
        'friends':                              'friendsPageHandler',
        'friends/':                             'friendsPageHandler',
        'featured-stories':                     'storiesPageHandler',
        'featured-stories/':                    'storiesPageHandler',
        '*fallback':                            'fallbackHandler'
    },

    home: function() {
        console.log('loaded the home page');
        this.hideContent([this.$aboutPage,this.$supportPage,this.$storiesPage,this.$friendsPage]);
        GW.home.setMainHeight(500);
    },

    aboutPageHandler: function() {
        console.log('load the about page');
        this.hideContent([this.$supportPage,this.$storiesPage,this.$friendsPage]);
        this.showContent(this.$aboutPage);
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: 100}, 500);
    },

    supportPageHandler: function() {
        console.log('load the support page');
        this.hideContent([this.$aboutPage,this.$storiesPage,this.$friendsPage]);
        this.showContent(this.$supportPage);
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: 500}, 500);
    },

    storiesPageHandler: function() {
        console.log('load the stories page');
        this.hideContent([this.$aboutPage,this.$supportPage,this.$friendsPage]);
        this.showContent(this.$storiesPage);
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: 0}, 500);
    },

    friendsPageHandler: function() {
        console.log('load the friends page');
        this.hideContent([this.$aboutPage,this.$supportPage,this.$storiesPage]);
        this.showContent(this.$friendsPage);
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: 100}, 500);
    },

    fallbackHandler: function(splat) {
        console.log('falling back to: ',splat);
    },


    /*
    * Utility function to show content
    * */
    showContent: function($page){
        if ($page.hasClass('notShowing')) {
            $('.contentBubble, .bubbles',$page).fadeIn('fast',function(){
                $page.removeClass('notShowing');
            });
        }
        GW.home.setMainHeight(500);
    },

    /*
    * Utility function to hide content
    * */
    hideContent: function(pagesArray){
        _.each(pagesArray,function($page){
            if (!$page.hasClass('notShowing')){
                // hide the content
                $page.addClass('notShowing');
                $('.contentBubble:visible,.bubbles:visible',$page).hide();
                // resize the window again if we're hiding a story
                if ($page.attr('id')=='storiesPage') {
                    $(document).trigger('hideStoryContent');
                }
            }
            $page.not('.notShowing').addClass('notShowing');
        });
    }

});