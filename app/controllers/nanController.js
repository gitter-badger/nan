/*  Copyright (C) 2016  emq
*
*    This program is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* global angular */
/* global jwplayer playerInstance*/
/* global STRAXVERSION videoPath*/

var nanController = angular.module('nanController', []);

nanController.controller("nanController", function($scope, $location, $anchorScroll, $routeParams, NeuAufNFLX) {
    $scope.straxVersion = 'v' + STRAXVERSION;

    $scope.init = false;

    $("#gotoVideo").click(function() {
        $(".collapse").collapse('show');
    });
    $("#btnHideVideo1, #btnHideVideo2").click(function() {
        $(".collapse").collapse('hide');
    });

    $('.collapse').on('shown.bs.collapse', function() {
        //jwplayer().play();
        //$location.hash('videoCollapse');
        console.log('event');
    });

    $('.collapse').on('hide.bs.collapse', function() {
        jwplayer().stop();
    });

    $scope.thisIssue = $routeParams.issue;

    // scroll to video
    $scope.gotoVideo = function(videoName, videoIssue) {
        $(".collapse").collapse('show');
        console.log('post');
        playerInstance.load([{
            file: videoPath + videoIssue + '/' + videoName
        }]);
        playerInstance.play();
    };

    // setup sorting if items
    $scope.predicate = 'title';
    $scope.btnclTitle = 'active';
    $scope.reverse = false;
    $scope.btnTitleIco = 'fa fa-sort-asc';
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
        $scope.btnclTitle = '';
    };
    
    $scope.setSortClass = function(button) {
        switch(button) {
            case 'title':
                $scope.btnclTitle = 'active';
                $scope.btnclRdate = '';
                switch($scope.reverse) {
                    case true:
                        $scope.btnTitleIco = 'fa fa-sort-desc';
                        $scope.btnRdateIco = '';
                        break;
                    case false:
                        $scope.btnTitleIco = 'fa fa-sort-asc';
                        $scope.btnRdateIco = '';
                        break;
                }
                break;
            case 'orderByDate':
                $scope.btnclRdate = 'active';
                $scope.btnclTitle = '';
                
                
                switch($scope.reverse) {
                    case true:
                        $scope.btnTitleIco = '';
                        $scope.btnRdateIco = 'fa fa-sort-desc';
                        break;
                    case false:
                        $scope.btnTitleIco = '';
                        $scope.btnRdateIco = 'fa fa-sort-asc';
                        break;
                }
                break;
        }
    };

    // set filter to show titles with trailers
    $scope.filterByHasTrailer = function(videoName) {

        if ($scope.fHasTrailer == 1) {
            return '';
        }
        else {
            return undefined;
        }
    };
    
    $scope.orderByDate = function(item) {
        var parts = item.releasedate.split('-');
        var date = new Date(parseInt(parts[2]), 
                            parseInt(parts[1]), 
                            parseInt(parts[0]));
    
        return date;
    };

    function getItems() {
        NeuAufNFLX.find(
            function(result) {
                $scope.nanItems = result;
                $scope.init = true;
            },
              function(errorResponse) { console.log('error: ' + errorResponse.status); $scope.error = errorResponse }
            );
    }
    getItems();

});