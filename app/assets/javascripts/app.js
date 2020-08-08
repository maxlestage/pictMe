var app = angular.module("myApp", []);

app.factory( 'dataService',function($http,$q) {
    return{
        getAllContacts: getAllContacts,
        getAllCampaigns: getAllCampaigns,
        getAllPictures: getAllPictures
    };

    //get all Contacts
    function getAllContacts( id ){
        var ID = $(this).attr("data-edition");
        console.log(ID);
      
        //abstract the call of https call
        return $http({
            method: 'GET',
            url: '/api/v1/editions/'+id+'/contacts'
        })
        .then( sendResponseData )
        .catch( sendGetContactsError );
    
    }

    function sendResponseData( reponse ){
        return reponse.data;
    }
    
    function sendGetContactsError( reponse ){
        return $q.reject('Error retreiving contacts(s). (HTTP status: ' + reponse.id + ')' );
    } 

    //get all Campaigns
    function getAllCampaigns( id ){
        var ID = $(this).attr("data-edition");
        console.log(ID);
      
        //abstract the call of https call
        return $http({
            method: 'GET',
            url: '/api/v1/editions/'+id+'/getCampaigns'
        })
        .then( sendResponseCampaignsData )
        .catch( sendGetCampaignsError );
    
    }
    function sendResponseCampaignsData( reponse ){
        return reponse.data;
    }
    
    function sendGetCampaignsError( reponse ){
        return $q.reject('Error retreiving Campaigns(s). (HTTP status: ' + reponse + ')' );
    } 

    //get all pictures
    function getAllPictures( event_id, id ){
        /* var ID = $(this).attr("data-edition");
        console.log(ID); */
      
        //abstract the call of https call
        return $http({
            method: 'GET',
            url: '/api/v1/events/'+event_id+'/editions/'+id+'/pictures'
        })
        .then( sendResponsePicturesData )
        .catch( sendGetPicturesError );
    
    }
    function sendResponsePicturesData( reponse ){
        return reponse.data;
    }
    
    function sendGetPicturesError( reponse ){
        return $q.reject('Error retreiving Pictures(s). (HTTP status: ' + reponse + ')' );
    } 
    

} )

app.controller("mainCtrl", function( dataService, $scope ){

    var vm = this;
    theID = null;
    vm.length = 0;
    vm.lengthCampaigns = 0;
    vm.perPageArr = [3, 5, 10, 20, 50];
    vm.curentPage = 1;
    vm.perPage = vm.perPage | 5 ;
    vm.numberPaginationArr = [];
    vm.numberPaginationCampaignsArr = [];

    vm.campaign = null;
    vm.email = null;
    //$scope.ids = [];

    vm.firstStep = true;
    vm.secondStep = false;
    vm.thirdStep = false;

    //Campains
    vm.allCampaigns = null; 

    /*=======================
    ===get contacts details per campaign==
    =========================*/
    vm.showContactsDetails = function( campaignId ){
        console.log( campaignId );
    }
    

    
    /*===============================
    =============Contacts=============
    =================================*/

    function getContactsSuccess( contacts ){
        vm.allContacts = contacts;
        console.log( vm.allContacts );
        vm.length = contacts.length;
        calculatePagination();
    }
    function getContactsError( errorMsg ){
        console.log('Error Message: ' + errorMsg );
    }

    function getCampaignsSuccess( campaigns ){
        vm.allCampaigns = campaigns;
        console.log( vm.allCampaigns );
        vm.lengthCampaigns = campaigns.length;
        calculatePaginationCampaign();
    }
    function getCampaignsError( errorMsg ){
        console.log('Error Message: ' + errorMsg );
    }

    vm.isUndefined = function (thing) {
        return (typeof thing === "undefined");
    }

    vm.getCurrentPage = function( id ){
        event.stopPropagation();
        vm.curentPage = id;
        //pagination
        calculatePagination();
        calculatePaginationCampaign();

    }

    //navigation events
    navigation = function( mode ){
        switch (mode) {
            case 'prev':
                if( vm.curentPage > 1 ){ vm.curentPage =  vm.curentPage - 1; }
                break;
            case 'next':
                if( vm.curentPage < vm.numberPagination ){ vm.curentPage =  vm.curentPage + 1; }
                break;
            case 'prevCampaign':
                if( vm.curentPage > 1 ){ vm.curentPage =  vm.curentPage - 1; }
                break;
            case 'nextCampaign':
                if( vm.curentPage < vm.numberCampaignPagination ){ vm.curentPage =  vm.curentPage + 1; }
                break;
            
        }

    }

    vm.previousContacts = function(){
        navigation('prev');
        calculatePagination();
    }
    vm.nextContacts = function(){
        navigation('next');
        calculatePagination();
    }
    //
    vm.previousCampaign = function(){
        navigation('prevCampaign');
        calculatePaginationCampaign();
    }
    vm.nextCampaign = function(){
        navigation('nextCampaign');
        calculatePaginationCampaign('nextCampaign');
    }

    

    /*===============================
    =============Campaign=============
    =================================*/

    vm.filterCampaign = [
        {id: 1, name: "contact avec Photo" },
        {id: 2, name: "Course de Bayonne" },
        {id: 3, name: "a déjà acheté" },
        {id: 4, name: "contacté" }
    ];
    vm.selectedfilterCampaign =  vm.filterCampaign[0];
    $scope.selectedEmails = [];

    vm.exist =  function( item ){
        return $scope.selectedEmails.indexOf( item ) > -1;
    }

    vm.toggleSelection = function( item ){
        var idx = $scope.selectedEmails.indexOf( item );
        if( idx > -1 ){
            $scope.selectedEmails.splice(idx, 1);
        }else{
            $scope.selectedEmails.push( item );
        }
    }

    vm.onSelected = function(){
        console.log( $scope.selectedEmails );
    }

    vm.checkAll = function(){
        if( !vm.selectAll ){
            angular.forEach( vm.allContacts, function( item ){
                idx = $scope.selectedEmails.indexOf( item );
                if(idx >= 0 ){
                    return true;
                }else{
                    $scope.selectedEmails.push( item );
                }
            } )
        }else{
            $scope.selectedEmails = [];
        }
    }

    vm.goFirstStep = function(){
        vm.firstStep = true;
        vm.secondStep = false;
        vm.thirdStep = false;
    }

    //show modal 2nd step
    vm.goSecondStep = function(){
        vm.firstStep = false;
        vm.secondStep = true;
        vm.thirdStep = false;
    }

    //show modal 2nd step
    vm.goThirdStep = function(){
        vm.firstStep = false;
        vm.secondStep = false;
        vm.thirdStep = true;
    }

    //show modal 3third step previsualisation
    $("body").on('click', '#importerCampaign', function(){
        $("#secondStepCampaign").modal('hide');
        $("#thirdStepCampaign").modal('show');
        vm.goSecondStep(); 
    });

    $("body").on('click', '#visualCampaign', function(){
        $("#thirdStepCampaign").modal('hide');
        vm.goThirdStep();
    });

    vm.secondStepCampaignModal = function(){
        $("#secondStepCampaign").modal('show');
        $("#thirdStepCampaign").modal('hide');
        vm.goFirstStep();
    }

    




    //Watchers

    $scope.$watch("vm.id", function( newID ){
        if( newID ){
            theID = newID;
            //get all Contacts
            dataService.getAllContacts( theID )
                .then( getContactsSuccess, getContactsError );
            dataService.getAllCampaigns( theID )
                .then( getCampaignsSuccess, getCampaignsError );
            calculatePagination();
            calculatePaginationCampaign();
        }
    });

    $scope.$watch("vm.perPage", function(){
        vm.curentPage = 1;
        calculatePagination();
        calculatePaginationCampaign();
    });

    $scope.$watch("vm.curentPage", function( ){
        calculatePagination();
        calculatePaginationCampaign();
    });

    /* $scope.$watch("vm.allContacts", function( newAllContracts ){
        vm.allContacts = newAllContracts;
    }); */
    
    


    //Campaign Watchers
    $scope.$watch("vm.campaign", function( newCampaign ){
        if(newCampaign){
            vm.campaign = newCampaign;
            console.log(vm.campaign);
        }
    });

    

    
    
    


    //private
    calculatePagination = function(){
        vm.numberPagination =  Math.ceil( vm.length / vm.perPage );
        vm.numberPaginationArr = [];
        for(i=0; vm.numberPagination > i ; i++){
            vm.numberPaginationArr.push( i );
        }
    }

    calculatePaginationCampaign = function(){
        vm.numberCampaignPagination =  Math.ceil( vm.lengthCampaigns / vm.perPage );
        vm.numberPaginationCampaignsArr = [];
        for(i=0; vm.numberCampaignPagination > i ; i++){
            vm.numberPaginationCampaignsArr.push( i );
        }
    }
    

    

    console.log( vm.firstStep );
    


    
    


});


app.controller("contactDetailsCtrl", function( $scope ){

    var vm = this

    theID = null;
    vm.length = 0;
    vm.lengthCampaigns = 0;
    vm.perPageArr = [1, 3, 5, 10, 20, 50];
    vm.curentPage = 1;
    vm.perPage = vm.perPage | 5 ;
    vm.numberPaginationArr = [];
    vm.numberPagination = 3;
    vm.deepCopy = vm.emailsArrays;

    //navigation events
    navigation = function( mode ){
        switch (mode) {
            case 'prev':
                if( vm.curentPage > 1 ){ vm.curentPage =  vm.curentPage - 1; }
                break;
            case 'next':
                if( vm.curentPage < vm.numberPagination ){ vm.curentPage =  vm.curentPage + 1; }
                break;
            
        }

    }

    vm.previousContacts = function(){
        navigation('prev');
        calculatePagination();
    }
    vm.nextContacts = function(){
        navigation('next');
        calculatePagination();
    }

    //
    $scope.$watch("vm.emailsArrays", function( newEmailsArrays ){
        if( newEmailsArrays ){
            vm.emailsArrays = newEmailsArrays;
            console.log( vm.emailsArrays );
            vm.length = vm.emailsArrays.length;
            calculatePagination();
            
        }
    });
    

    $scope.$watch("vm.perPage", function( newPerPage ){
        if( newPerPage ){
            vm.curentPage = 1;
            calculatePagination();
        }
        
    });

    

    //
    /* $scope.$watch("vm.numberPagination", function( newNumberPagination ){
        if( newNumberPagination ){
            vm.numberPagination = newNumberPagination;
        }
    }); */

    //private
    calculatePagination = function(){
        vm.numberPagination =  Math.ceil( vm.length / vm.perPage );
        console.log("vm.numberPagination : " + vm.numberPagination);
        console.log("vm.length : " + vm.length);
        console.log("vm.perPage : " + vm.perPage);
        vm.numberPaginationArr = [];
        for(i=0; vm.numberPagination > i ; i++){
            vm.numberPaginationArr.push( i );
        }
        //debugger
    }

});


//pictures
app.controller("picturesDetailsCtrl", function( $scope ){

    var vm = this;
    vm.orderPictureArr = [{attr: 'Du récent au plus vieux' , val: 'created_at'}, {attr: 'Du vieux au plus récent' , val: '-created_at'}];

    $scope.$watch("allPictures", function( newPictures ){
        if( newPictures ){
            $scope.allPictures = newPictures;
        }   
    });

    $scope.getObject =  function(obj){
        var myObj = JSON.parse( obj );
        var myID = myObj.id;
        return myID;
    }

    //
    $scope.$watch("vm.orderPicture", function( newOrderPictures ){
        if( newOrderPictures ){
            vm.orderPicture = newOrderPictures;
        }   
    });
    

});

/*==============================================================================
===============================DIRECTIVES=======================================
===============================================================================*/

//pictures Directives
app.directive('picturesDirective', function(){
    return{
      restrict: "E",
      templateUrl: '/templates/pictures.html',
      link: function(scope, element, attrs){

      },
      controller: function(dataService, $scope, $element, $attrs){
        var vm = this;
        var thevalueid = $element.attr("thevalueid");
        var thevalueidevent = $element.attr("thevalueidevent");

        dataService.getAllPictures( thevalueidevent, thevalueid )
            .then( getPicturesSuccess, getPicturesError );

        function getPicturesSuccess( Pictures ){
            $scope.allPictures = Pictures;
            console.log($scope.allPictures);
        }
        function getPicturesError( errorMsg ){
            console.log('Error Message: ' + errorMsg );
        }

        $attrs.$observe('picturesDirective', function (newPictures) {
            if (newPictures) {
                console.log(newPictures);
                // pass value to app controller
                $scope.allPictures = newPictures;
            }
        });  

      }
    }
 });





