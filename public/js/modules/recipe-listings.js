var cookies = require('../utils/cookies');
var rightNav = require('../modules/right-nav');
var ui = require('../ui');
var urlq = require('urlq');

module.exports.sortOrder = sortOrder;
module.exports.updateRecipes = updateRecipes;

function updateRecipes($recipes) {
  var $recipesWrap = $recipes.find('.rlm-wrap'),
    loc = window.location.pathname;

  // Recipes is currently '/' but '/recipes' in the api.
  if (loc.indexOf('/recipes') === -1) loc = '/recipes';

  ui.loadingStart($recipesWrap);
  $.ajax({
    url: `/api${loc}/html${window.location.search}`
  }).done(function(data) {
    data = JSON.parse(data);
    ui.loadingStop($recipesWrap);
    $recipes.replaceWith(data.recipesHtml);

    // Attach new listeners.
    rightNav.toggle({
      el: '.rlm-none .js-rnav-ctrl, .rlm-tally .js-rnav-ctrl'
    });
    sortOrder();
  });
}

function sortOrder() {
  ui.eventChange({
    el: '.js-rlm-sort',
    cb: onChange
  });

  function onChange($this) {
    var cookie = $this.data('sort'),
      sort = $this.val(),
      $recipes = $('.m-recipe-listings');
    cookies.setCookie(cookie, sort);
    urlq.updateQuery(
      urlq.updateParam(window.location.search, 'sort', [sort])
    );
    updateRecipes($recipes);
  }
}
