var myModule = angular.module("myApp");
myModule.factory('InitializationService', function($http, $timeout, Upload, BasicDataService, GraphConfigService) {
    var service = {};

    service.initializeCommonVariables = initializeCommonVariables;

    function initializeCommonVariables(scope) {
        scope.selectedItemFirst = null;
        scope.selectedGOI = null;
        scope.zoomGene = null;
        scope.searchTextGOI = "";
        scope.searchTextFirst = "";
        scope.searchTextSecond = "";
        scope.searchTextZoom = "";
        scope.minPositiveWeight = 0;
        scope.minNegativeWeight = 0;

        scope.pValues = angular.copy(BasicDataService.pValues);
        scope.layouts = angular.copy(BasicDataService.layouts);

        scope.minDegree = {
            first: 0,
            second: 0
        }

        scope.totalInteractions = null;

        scope.display = "Graph";
        scope.switchModel = false;

        scope.selectedLayout = scope.layouts[0].value;

        scope.sliderMinWeightNegative = -1;
        scope.sliderMaxWeightPositive = 1;

        scope.correlationFilterModel = {
            min: -1,
            max: 1,
            negativeFilter: 0,
            positiveFilter: 0,
            negativeEnabled: false,
            positiveEnabled: false
        };

        scope.correlationFilterFirst = angular.copy(scope.correlationFilterModel);
        scope.correlationFilterSecond = angular.copy(scope.correlationFilterModel);

        scope.negativeFilterEnabled = false;
        scope.positiveFilterEnabled = false;

        scope.findGeneInGraph = GraphConfigService.findGeneInGraph;
        scope.getInteractingNodes = GraphConfigService.getInteractingNodes;
        scope.applyConfig = GraphConfigService.applyConfig;

        scope.getNodesWithMinDegree = BasicDataService.getNodesWithMinDegree;
        scope.loadDropdownOptions = BasicDataService.loadDropdownOptions;
        scope.loadGeneListDropdownOptions = BasicDataService.loadGeneListDropdownOptions;
        scope.loadNeighbourDropdownOptions = BasicDataService.loadNeighbourDropdownOptions;
        scope.querySearch = BasicDataService.querySearch;
        scope.setNeighboursGeneral = BasicDataService.setNeighboursGeneral;

        scope.genesOfInterest = [];
        scope.edges = 0;
        scope.nodes = 0;
        scope.displaySecondNeighbours = true;

        scope.GOIStates = {
            initial: 0,
            filterFirst: 1,
            getSecondNeighbours: 2,
            filterSecond: 3
        };

        scope.GOIState = scope.GOIStates.initial;

        scope.firstNeighbourInteractions = [];
        scope.secondNeighbourInteractions = [];

        scope.firstNeighbours = {
            epi: [],
            stroma: []
        };

        scope.secondNeighbours = {
            epi: [],
            stroma: []
        };

        scope.resize = GraphConfigService.resetZoom;

        scope.edgeDictionary = {};
        scope.selfLoops = [];
        scope.allVisibleGenes = [];
    }

    return service;
});
