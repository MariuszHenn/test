class Products extends Controller
  constructor: ($scope, productsService)->

    productsService.get()
    .then (products)->
      $scope.products = products