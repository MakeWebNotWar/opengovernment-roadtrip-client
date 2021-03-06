Opengov.MapView = Ember.View.extend({
  didInsertElement: function(){
    var self, controller, map;

    self = this;
    controller = self.get('controller');
    map = controller.get('map');

    $(window).bind('resize.mapview', function(){
        self.resizeElement();
    }).trigger('resize.mapview');


    controller.mapInit()
      .then(function(m){
        return(controller.addPins())
      })
      .then(function(){
        controller.setBoundingBox();
      });
  },
  willDestroyElement: function(){
    $(window).unbind('resize.mapview');
  },
  resizeElement: function(){
    var self, topMenuHeight, footerHeight, sideMenuWidth, widthDiff;
    self = this;

    topMenuHeight = $('#top-menu').outerHeight();
    footerHeight = $('footer').outerHeight();
    sideMenuWidth = $('#side-menu').outerWidth();
    widthDiff = $(window).outerWidth() - sideMenuWidth;
    heightDiff = $(window).outerHeight() - topMenuHeight - footerHeight;

    self.$().outerWidth(widthDiff);
    self.$().outerHeight(heightDiff);

  }
});
