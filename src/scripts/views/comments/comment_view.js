Opengov.CommentView = Ember.View.extend({
  templateName: 'comments/comment',
  didInsertElement: function(){
    this.$(window).resize();
  }
});