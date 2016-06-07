class Products extends Service
  constructor: ($http, $q, Product)->

    cache = []

    count = 0

    @get = ->
      defer = $q.defer()
      $http.get '/products.json'
      .then (response)->
        count = response.data.count
        for product in response.data.products
          cache.push new Product product
        defer.resolve
          products: cache[0...5]
          pages: count/5
      , ->
        defer.reject 'Error loading products'

      defer.promise

#    pseudo (local) pagination

    @page = (page_number)->
      defer = $q.defer()
      _offset = (page_number-1)*5
      defer.resolve
        products: cache[_offset..._offset+5]
        pages: count/5
      defer.promise
