var ui = require('../ui');
var nav = require('../components/nav');

module.exports.updateRecipes = updateRecipes;

function updateRecipes($recipes) {
  var $recipesWrap = $recipes.find('.rlm-wrap');

  ui.loadingStart($recipesWrap);
  $.ajax({
    url: '/api/recipes/html' + window.location.search
  }).done(function(data) {
    data = JSON.parse(data);
    ui.loadingStop($recipesWrap);
    $recipes.replaceWith(data.recipesHtml);

    // No recipes, suggest updating filters.
    if (!data.recipesCount) nav.doNav({
      el: '.rlm-none .js-nav-ctrl'
    });
  });
}
