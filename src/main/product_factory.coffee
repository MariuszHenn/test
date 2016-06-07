class Product extends Factory
  constructor: ->
    return class ProductInstance
      constructor: (obj)->
        angular.merge @, obj