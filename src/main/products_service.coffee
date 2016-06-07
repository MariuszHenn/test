class Products extends Service
  constructor: ($http, $q, Product)->

    cache = []

    @get = ->
      defer = $q.defer()
      $http.get '/products.json'
      .then (data)->
        for product in data
          cache.push new Product product
        defer.resolve cache
      , ->
        defer.reject 'Error loading products'

      defer.promise