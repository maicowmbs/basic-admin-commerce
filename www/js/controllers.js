angular.module('app.controllers', [])

.controller('vendasCtrl', ['$scope', '$stateParams', '$state','StorageServiceVendas',
function ($scope, $stateParams, $state, StorageServiceVendas) {

	$scope.vendas = StorageServiceVendas.getAll();

	$scope.direcionaVenda = function(index){
		$state.go("tabsController.venda", {indexArray: index});
	};


}])

.controller('vendaCtrl', ['$scope', '$stateParams', '$state', 'StorageServiceVendas', 'StorageServiceProdutos',
function ($scope, $stateParams, $state, StorageServiceVendas, StorageServiceProdutos) {

	var vendas 		= StorageServiceVendas.getAll();

	$scope.indexArray = undefined;
	$scope.novo = true;
	$scope.venda = {
		nome: 	'',
		tipo: 	'',
		descricao: '',

		produtos: [],

		troco: 0,
		pagamento: 0,
		total: 	0
	};

	if($state.params.indexArray){
		$scope.indexArray = $state.params.indexArray;
		$scope.venda = vendas[$scope.indexArray];
		$scope.novo = false;
	}

	$scope.produtosStorage = StorageServiceProdutos.getAll();
	$scope.produtos = [];

	for (var i = 0; i < $scope.produtosStorage.length; i++) {
		var produto = {
			nome: $scope.produtosStorage[i].nome,
			valor: $scope.produtosStorage[i].valor,
      		id: $scope.produtosStorage[i].id,
			quantidade: 0
		};
		$scope.produtos.push(produto);

	};

	$scope.add = function(newItem){
		StorageServiceVendas.add(newItem);
		$state.go("tabsController.vendas");
	};

	$scope.remove = function(Item){
		StorageServiceVendas.remove(Item);
		$state.go("tabsController.vendas");
	};

	$scope.update = function(){
		vendas[$scope.indexArray] = $scope.venda;
		StorageServiceVendas.updateAll(vendas);
		$state.go("tabsController.vendas");
	};

	// $scope.$watch('produtos', function(newVal) {
	// 	var total = 0;
    //     for (var i = 0; i < newVal.length; i++) {
    //     	total += (newVal[i].valor * newVal[i].quantidade);
    //     };
    //     $scope.venda.total = total + $scope.venda.valor;

    // }, true);

    // $scope.$watch('venda.pagamento', function(newVal) {
    //     // $scope.venda.troco += newVal;
	// 	atualizaTroco();
    // }, true);
	$scope.adicionaProduto = function(produto) {
		calculaVenda(true, produto.valor);
	}

	function calculaVenda(add, valorProduto) {

		if(add)
			$scope.venda.total += valorProduto;
		else
			$scope.venda.total -= valorProduto;

		$scope.venda.troco = $scope.venda.pagamento - $scope.venda.total;
	}


}])

.controller('produtosCtrl', ['$scope', '$stateParams', '$state', '$window', 'StorageServiceProdutos',
function ($scope, $stateParams, $state, $window, StorageServiceProdutos) {

	$scope.produtos = StorageServiceProdutos.getAll();

	$scope.direcionaProduto = function(index){
		$state.go("tabsController.produto", {indexArray: index});
	};

}])

.controller('produtoCtrl', ['$scope', '$stateParams', '$state', 'StorageServiceProdutos',
function ($scope, $stateParams, $state, StorageServiceProdutos) {

	var produtos = StorageServiceProdutos.getAll();
	$scope.indexArray = undefined;
	$scope.novo = true;
	$scope.produto = {
		nome: 	'',
		valor: 	'',
		tipo: 	'',
		quantidade: 0
	};

	if($state.params.indexArray){
		$scope.indexArray = $state.params.indexArray;
		$scope.produto = produtos[$scope.indexArray];
		$scope.novo = false;
	}

	$scope.add = function(newItem){
		StorageServiceProdutos.add(newItem);
		$state.go("tabsController.produtos");
	};

	$scope.remove = function(Item){
		StorageServiceProdutos.remove(Item);
		$state.go("tabsController.produtos");
	};

	$scope.update = function(){
		produtos[$scope.indexArray] = $scope.produto;
		StorageServiceProdutos.updateAll(produtos);
		$state.go("tabsController.produtos");
	};

}])

.controller('relatRioCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
