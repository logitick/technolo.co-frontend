import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('news-dashboard');

  this.route('components', function() {
    this.route('bs-layout');
  });
});

export default Router;
