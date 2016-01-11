import './styles.scss'
import template from './template.jade'

export default (module) => module.directive('docsNavigation', function() {
  return {
    restrict: 'E',
    template: template,
    scope: {
      documents: '=',
    }
  }
})
