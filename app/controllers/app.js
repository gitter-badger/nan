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

// init
var scrolling = false;

function NaNtitle(args) {
    args = args || {};
    this.title = args.title || "";
    this.category = args.category || "Neu auf Netflix";
    this.type = args.type || "";
    this.season = args.season || "";
    this.releasedate = args.releasedate || "";
    this.text = args.text || "";
    this.image = args.image || "";
    this.issue = args.issue || "";
}

var nan = angular.module("nan", ['ngRoute', 'firebase', 'ngSanitize', 'lbServices', 'ui.bootstrap', 'ngAnimate', 'nanController', 'motmController', 'addtitleController']);

nan.config(function($routeProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            controller: 'nanController',
            templateUrl: 'app/partials/nan.html'
        })
        .when('/issue/:issue', {
            controller: 'nanController',
            templateUrl: 'app/partials/nan.html'
        })
        .when('/addTitle', {
            controller: 'addtitleController',
            templateUrl: 'app/partials/addtitle.html'
        })
        .when('/impressum', {
            controller: 'nanController',
            templateUrl: 'app/partials/impressum.html'
        })
        .when('/datenschutzbestimmungen', {
            controller: 'nanController',
            templateUrl: 'app/partials/datenschutz.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});

nan.filter('split', function() {
    return function(input, delimiter) {
        var delimiter = delimiter || ',';
        if (input == undefined) {
            return;
        }

        return input.split(delimiter);
    };
});

nan.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});

nan.directive('scrollTo', function($location, $anchorScroll) {
    return function(scope, element, attrs) {
        element.bind('click', function(event) {
            scrolling = true;
            event.stopPropagation();
            scope.$on('$locationChangeStart', function(ev) {
                if (scrolling) {
                    ev.preventDefault();
                }
                scrolling = false;
            });
            var location = attrs.scrollTo;
            $location.hash(location);
            $anchorScroll();
        });
    };
});

nan.directive('tooltip', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).hover(function() {
                // on mouseenter
                $(element).tooltip('show');
            }, function() {
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});

nan.directive('footer', function() {
  return {
    templateUrl: 'app/partials/directives/footer.html'
  };
});