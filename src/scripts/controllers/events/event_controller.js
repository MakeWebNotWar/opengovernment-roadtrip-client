Opengov.EventController = Ember.ObjectController.extend(Opengov.MapMixin, {
  needs: ['comment', 'user'],
  actions: {
    createComment: function(){
      var self, store, url, data;

      self = this;
      window.ray = self;
      store = self.store.adapterFor('application');
      url = [store.host, store.namespace, 'comments'].join('/');

      data = {
        comment: {
          event_id: self.get('id'),
          text: self.get('new_comment_text')
        }
      };

      Ember.$.ajax({
        url:url, 
        data: data,
        type: "POST",
        headers: {
          "X-Authentication-Token": self.get('session.authentication_token'),
          "X-User-Email": self.get('session.user_email')
        }
      }).then(
        function(response) {          
          comment = self.get('store').push('comment', response.comment);

          self.get('comments').pushObject(comment);
        },
        function(response){
          self.set('errorMessage', response.message)
        }
      );
      
    }
  }
});