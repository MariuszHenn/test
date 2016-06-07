class ProductView extends Directive
  constructor: ->

    product =
      restrict: 'E'
      scope:
        product: '='

      templateUrl: '/templates/product.html'

    return product