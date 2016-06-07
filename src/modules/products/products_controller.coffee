class Products extends Controller
  constructor: ($scope, productsService)->

    fetch = (data)->
      $scope.products = data.products
      $scope.pages = new Array data.pages

    angular.extend $scope, {
      current_page: 1
      products: []
      pages: 0

      next: ->
        page = $scope.current_page
        page = Math.min page+1, pages
        productsService.page page
        .then fetch

      prev: ->
        page = $scope.current_page
        page = Math.max page-1, 1
        productsService.page page
        .then fetch

      open_page: (page)->
        $scope.current_page = page
        productsService.page page
        .then fetch
    }

    productsService.get()
    .then fetch

