Opengov.EventIndexController = Ember.ObjectController.extend(Opengov.MapMixin, {
  needs: ['comment', 'user', 'login'],
  actions: {
    createComment: function(){
      var self, store, url, data;

      self = this;
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
          var store, comment;

          store = self.store;
          comment = response.comment;
          
          comment = store.push('comment', comment);

          $.each(['user', 'event'], function(index, model){
            comment.get(model).then(function(record){
              record.get('comments').then(function(comments){
                comments.addObject(comment);
              });
            });  
          });
          
          
        },
        function(response){
          self.set('errorMessage', response.message)
        }
      );  
    },
  }
});
