Opengov.EventsRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('event');
  }
});

Opengov.EventRoute = Ember.Route.extend({
  renderTemplate: function(){
    this.render('events/details', {
      outlet: "main"
    });
  },
  model: function(params){
    return this.store.find('event', params.event_id)
  }
});