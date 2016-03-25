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

var addtitleController = angular.module('addtitleController', []);

addtitleController.controller('addtitleController', function($scope, $location, $anchorScroll, $routeParams, NeuAufNFLX, User) {

    $scope.doLogin = function(email, password) {
        User.login({
            email: email,
            password: password
        });
    };
    
    $scope.doLogout = function(){
        User.logout({ });
    };

    // ui datepicker setup
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        //minDate: new Date(),
        showWeeks: false
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        //minDate: new Date(),
        startingDay: 1
    };

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [{
        date: tomorrow,
        status: 'full'
    }, {
        date: afterTomorrow,
        status: 'partially'
    }];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };
    //end setup




    $scope.save = function() {
       
        var rldate = $scope.dt;
        rldate.setHours(6,0,0,0);
            NeuAufNFLX.create({
                title: $scope.newTitle,
                releasedate: rldate,
                image: $scope.newImage,
                issue: $scope.newIssue,
                category: 'Neu auf Netflix',
                season: $scope.newSeason || null,
                type: $scope.newType,
                video: $scope.newVideo || null,
                description: '' || '',
                nflxOriginal: $scope.newOriginal || false
            }, 
              function(list) { console.log('YEAH'); $scope.success = list.title + ' has been saved Succesfully'},
              function(errorResponse) { console.log('error: ' + errorResponse.status); $scope.error = errorResponse }
            );

        

        //$location.path('/services');

    };
    
    isLoggedIn();
    
    function isLoggedIn() {
        console.log(User.isAuthenticated());
        $scope.loggedIn = User.isAuthenticated();
        if ($scope.loggedIn != true) {
            //$location.path('/login:401');
            console.log('not logged in');
        }
    }

})