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
/* global Firebase firebaseURL*/

var motmController = angular.module('motmController', []);

motmController.controller("motmController", function($scope, $firebaseObject) {
    var ref = new Firebase(firebaseURL);

    // download the data into a local object
    var syncObject = $firebaseObject(ref);
    // synchronize the object with a three-way data binding
    syncObject.$bindTo($scope, "motm");
});