var filters = require('../components/filters');
var nav = require('../components/nav');
var overlays = require('../components/overlays');
var recipeListings = require('./recipe-listings');

module.exports.init = init;
module.exports.toggle = toggle;

var bodyClass = 'active-right-nav';

function init() {
  filters.doFilters(function() {
    var $recipes = $('.m-recipe-listings');
    recipeListings.updateRecipes($recipes);
  });

  toggle({});
}

function toggle(opts) {
  var el = opts.el;

  nav.toggleCtrl({
    el: el || '.js-nav-ctrl',
    beforeShow: _beforeShowNav,
    afterHide: _afterHideNav
  });
}

function _afterHideNav() {
  $('body').removeClass(bodyClass);
  overlays.hideOverlay({
    el: '.js-overlay'
  });
}

function _beforeShowNav() {
  $('body').addClass(bodyClass);
  overlays.showOverlay({
    el: '.js-overlay',
    hide: {
      clickToHide: true,
      cb: _afterHideOverlay
    }
  });

  function _afterHideOverlay() {
    nav.toggle({
      el: '.js-right-nav'
    });
  }
}
