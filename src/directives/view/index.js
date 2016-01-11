import './style.scss'
import template from './template.jade'

export default (module) => module.directive('docView', function($timeout, $stateParams, $anchorScroll, $state, $location) {

  return {
    restrict: 'E',
    template: template,
    scope: {
      meta: '='
    },
    link: function(scope, element, attrs) {
      console.log(scope.meta)
      if (!scope.meta) {
        return
      }

      return $timeout(function() {
        var appElement = angular.element(scope.meta.doc)
        var docModules = ["docs", "ngMaterial"]

        if(scope.meta.module){
          docModules.push(scope.meta.module.name)
        }

        angular.bootstrap(appElement, docModules)
        element.find('section').append(appElement)

        appElement.find('a').on('click', function(event) {
          var href = angular.element(this).attr('href')
          if (href.charAt(0) === '#') {
            section = href.replace(/^#/, '')
            $anchorScroll(section)
            $location.search({
              section: section
            }).replace()
            event.preventDefault()
          }
        })
        if ($stateParams.section) {
          $timeout(function() {
            $anchorScroll($stateParams.section)
          })
        }
      })
    }
  }
})
