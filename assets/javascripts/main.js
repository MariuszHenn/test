(function(){
angular.module("app",[]);var ProductView;ProductView=function(){function r(){var r;return r={restrict:"E",scope:{product:"="},templateUrl:"/templates/product.html"}}return r}(),angular.module("app").directive("productView",[ProductView]);var Product;Product=function(){function r(){var r;return r=function(){function r(r){angular.merge(this,r)}return r}()}return r}(),angular.module("app").factory("Product",[Product]);var Products;Products=function(){function r(r,t){var e;e=function(t){return r.products=t.products,r.pages=new Array(t.pages)},angular.extend(r,{current_page:1,products:[],pages:0,next:function(){var n;return n=r.current_page,n=Math.min(n+1,pages),t.page(n).then(e)},prev:function(){var n;return n=r.current_page,n=Math.max(n-1,1),t.page(n).then(e)},open_page:function(n){return r.current_page=n,t.page(n).then(e)}}),t.get().then(e)}return r}(),angular.module("app").controller("productsController",["$scope","productsService",Products]);var Products;Products=function(){function r(r,t,e){var n,u;n=[],u=0,this.get=function(){var o;return o=t.defer(),r.get("/products.json").then(function(r){var t,c,a,p;for(u=r.data.count,p=r.data.products,t=0,c=p.length;c>t;t++)a=p[t],n.push(new e(a));return o.resolve({products:n.slice(0,5),pages:u/5})},function(){return o.reject("Error loading products")}),o.promise},this.page=function(r){var e,o;return o=t.defer(),e=5*(r-1),o.resolve({products:n.slice(e,e+5),pages:u/5}),o.promise}}return r}(),angular.module("app").service("productsService",["$http","$q","Product",Products]);
})();