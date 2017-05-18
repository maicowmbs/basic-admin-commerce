angular.module('app.controllers', [])

.controller('vendasCtrl', ['$scope', '$stateParams', '$state','StorageServiceVendas', '$cordovaSocialSharing', '$filter',
function ($scope, $stateParams, $state, StorageServiceVendas, $cordovaSocialSharing, $filter) {

	$scope.vendas = groupByDate(StorageServiceVendas.getAll());

	$scope.direcionaVenda = function(id){
		$state.go("tabsController.venda", {id: id});
	};


	$scope.share = function () {
     $cordovaSocialSharing.shareViaEmail('This is my message', 'Subject string', null, 'http://www.mylink.com');
	}
	//console.log($cordovaSocialSharing);

	$scope.share = function() {
        $cordovaSocialSharing
            .shareViaWhatsApp('sharedMsg', "a", "aaa", 'http://www.ticarpa.com.br')
            .then(function(result) {
            }, function(err) {
                // An error occurred. Show a message to the user
                alert("error : "+err);
            });
    };

		function groupByDate(vendas){
      var grouped = {};
      _.forEach(vendas, function(venda){
          var actualData = $filter('date')(new Date(venda.data), 'dd/MM/yyyy');
          if ( !grouped[actualData] ){
            grouped[actualData] = [];
          }
          grouped[actualData].push(venda);
      });

      return grouped;
  };

  console.log($scope.vendas);

}])

.controller('vendaCtrl', ['$scope', '$stateParams', '$state', 'StorageServiceVendas', 'StorageServiceProdutos', '_',
function ($scope, $stateParams, $state, StorageServiceVendas, StorageServiceProdutos, _) {

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

	if($state.params.id){
		//$scope.indexArray = $state.params.indexArray;
		//$scope.venda = vendas[$scope.indexArray];
		$scope.id = $state.params.id;
		$scope.venda = StorageServiceVendas.get($scope.id);
		console.log($scope.venda);
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
		console.log($scope.novo);
		//if($scope.venda.produtos.length > 0){
		if(!$scope.novo){
			_.find($scope.venda.produtos, function(item) {
								if (item.id === produto.id) {
									produto.quantidade = item.quantidade;
								}
					});
		}


		$scope.produtos.push(produto);

	};

	function verificaProduto(){

	}



	$scope.adicionaProduto = function(produto) {
		produto.quantidade++;
		$scope.calculaVenda(true, produto.valor);
		if($scope.venda.produtos.length === 0){

			$scope.venda.produtos.push(produto);

		} else {
			var primeiroItem = false;
			index = _.find($scope.venda.produtos, function(item, index) {
										if (item.id === produto.id) {
											if(index === 0){
												primeiroItem = true
											}
											return index;
										} else {
											return null;
										}
							});

			if(!primeiroItem && !index){
				$scope.venda.produtos.push(produto);
			}
		}
		console.log($scope.venda.produtos);
	}


	$scope.removeProduto = function(produto) {

		if(produto.quantidade>1){
			produto.quantidade--;
			$scope.calculaVenda(false, produto.valor);
		} else if(produto.quantidade === 1){
			var primeiroItem = false;
			index = _.find($scope.venda.produtos, function(item, index) {
										if (item.id === produto.id) {
											if(index === 0){ primeiroItem = true }
											return index;
										} else {
											return null;
										}
							});
			$scope.venda.produtos.splice(index, 1);
			produto.quantidade--;
			$scope.calculaVenda(false, produto.valor);
		}
		console.log($scope.venda.produtos);
	}



	$scope.calculaVenda = function(add, valorProduto) {
		if(add){ $scope.venda.total += valorProduto; }
		else if(!add) { $scope.venda.total -= valorProduto; };

		if($scope.venda.pagamento > 0){
			$scope.venda.troco = $scope.venda.pagamento - $scope.venda.total;
		} else if($scope.venda.pagamento <= 0){
				$scope.venda.troco = 0;
		};
	};


	$scope.add = function(newItem){
		newItem.data = new Date();
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



	$scope.jsonToExport = [
  	{
    	"col1data": "1",
      "col2data": "Fight Club",
      "col3data": "Brad Pitt"
    },
  	{
    	"col1data": "2",
      "col2data": "Matrix (Series)",
      "col3data": "Keanu Reeves"
    },
  	{
    	"col1data": "3",
      "col2data": "V for Vendetta",
      "col3data": "Hugo Weaving"
    }
  ];

	// Prepare Excel data:
	$scope.fileName = "report";
	$scope.exportData = [];
  // Headers:
	$scope.exportData.push(["#", "Movie", "Actor"]);
  // Data:
	angular.forEach($scope.jsonToExport, function(value, key) {
    $scope.exportData.push([value.col1data, value.col2data, value.col3data]);
	});








}])
