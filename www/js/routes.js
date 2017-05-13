angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('tabsController.relatRio', {
    url: '/relatório',
    views: {
      'tab3': {
        templateUrl: 'templates/relatRio.html',
        controller: 'relatRioCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })



  .state('tabsController.vendas', {
    url: '/vendas',
    views: {
      'tab1': {
        templateUrl: 'templates/vendas.html',
        controller: 'vendasCtrl'
      }
    }
  })
  .state('tabsController.venda', {
    url: '/venda/:indexArray',
    views: {
      'tab1': {
        templateUrl: 'templates/venda.html',
        controller: 'vendaCtrl'
      }
    } 
  })



  .state('tabsController.produtos', {
    url: '/produtos',
    views: {
      'tab2': {
        templateUrl: 'templates/produtos.html',
        controller: 'produtosCtrl'
      }
    }
  })
  .state('tabsController.produto', {
    url: '/produto/:indexArray',
    views: {
      'tab2': {
        templateUrl: 'templates/produto.html',
        controller: 'produtoCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/vendas')

  

});