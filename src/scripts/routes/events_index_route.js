Opengov.EventsIndexRoute = Ember.Route.extend({
  model: function(params){
    return this.get('store').find('event');
  }
});