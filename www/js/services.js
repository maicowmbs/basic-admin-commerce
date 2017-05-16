angular.module('app.services', ['ngStorage'])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory ('StorageServiceProdutos', function ($localStorage) {

  $localStorage = $localStorage.$default({
    produtos: [],
    contadorProduto: 0
  });

  var _getAll = function () {
    return $localStorage.produtos;
  };

  var _get = function (index) {
    return $localStorage.produtos[index];
  }

  var _add = function (produto) {
    produto.id=$localStorage.contadorProduto;
    $localStorage.contadorProduto++;
    $localStorage.produtos.push(produto);
  }

  var _updateAll = function (produtos) {
    $localStorage.produtos = produtos;
  }

  var _remove = function (produto) {
    $localStorage.produtos.splice($localStorage.produtos.indexOf(produto), 1);
  }

  return {
    getAll: _getAll,
    get: _get,
    add: _add,
    updateAll: _updateAll,
    remove: _remove
  };
})

.factory ('StorageServiceVendas', function ($localStorage) {

  $localStorage = $localStorage.$default({
    vendas: [],
    contadorVendas: 0
  });

  var _getAll = function () {
    return $localStorage.vendas;
  };

  var _get = function (index) {
    return $localStorage.vendas[index];
  }

  var _add = function (venda) {
    produto.id=$localStorage.contadorVendas;
    $localStorage.contadorVendas++;
    $localStorage.vendas.push(venda);
  }

  var _updateAll = function (vendas) {
    $localStorage.vendas = vendas;
  }

  var _remove = function (venda) {
    $localStorage.vendas.splice($localStorage.vendas.indexOf(venda), 1);
  }

  return {
    getAll: _getAll,
    get: _get,
    add: _add,
    updateAll: _updateAll,
    remove: _remove
  };
})



;
