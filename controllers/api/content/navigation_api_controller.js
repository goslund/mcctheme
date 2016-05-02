/*
 Copyright (C) 2015  PencilBlue, LLC

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var path = require('path');
var $q = require('q');
module.exports = function(pb) {

    //PB dependencies
    var util = pb.util;
    var SecurityService = pb.SecurityService;
    // var SectionService = pb.SectionService;
    // var ArticleServiceV2 = pb.ArticleServiceV2;
    /**
     *
     * @class NavigationApiController
     * @constructor
     * @extends BaseApiController
     */
    function NavigationApiController() {}
    util.inherits(NavigationApiController, pb.BaseApiController);

    /**
     * Initializes the controller
     * @method init
     * @param {Object} context
     * @param {Function} cb
     */
    NavigationApiController.prototype.init = function(context, cb) {
        var self = this;
        var init = function(err) {
            // self.menuService = new pb.TopMenuService();
            self.siteQueryService = new pb.SiteQueryService({ site: self.site, onlyThisSite: true });
            self.sectionService = new pb.SectionService({ site: self.site });
            self.pageService = new pb.PageService(self.getServiceContext());
            cb(err, true);
        };

        NavigationApiController.super_.prototype.init.apply(this, [context, init]);
    };

    /**
     * Process the generic API options as well as the article specific "render" option
     * @method processQuery
     * @return {Object}
     */
    NavigationApiController.prototype.processQuery = function() {
        var options = NavigationApiController.super_.prototype.processQuery.apply(this);
        // console.log(options, this.query);
        options.where = {};
        options.where.name = this.query.name;
        options.render = !!this.query.render; //pass 1 for true, 0 or nothing for false
        return options;
    };

    NavigationApiController.prototype.populateTree = function(container) {
        var self = this;

        var promise = $q.defer();

        if (container != {}) {
            console.log("container: ", container);
            console.log(container.type === 'container' && container.children.length > 0)
            if (container.type === 'container' && container.children.length > 0) {
                console.log("here");
                var subpromises = []; // populate children

                for (i = 0; i < container.children.length; i++) {

                    var subp = self.populateTree(container.children[i]);
                    subpromises.push(subp);
                    console.log(subpromises);
                }
                $q.all(subpromises).then(function(data) {
                    promise.resolve(container);
                }, function(error) {
                    console.log("Error!", error);
                })
            } else if (container.type === 'page') {

                //lookup page url
                var pagepromise = $q.defer();

                pagepromise.promise.then(function(data) {
                    promise.resolve(data);
                })

                self.pageService.get(container.item, {}, function(err, content) {
                    container.slug = content.url
                    console.log("page service!");
                    pagepromise.resolve(container);
                })

                



            } else {
                promise.reject();
            }

        } else {
            console.log(container === {});
            promise.resolve(container);
        }

        return promise.promise;

    }

    NavigationApiController.prototype.findTree = function(name, containers) {
        var self = this;
        console.log("Containers!!", containers);
        //check root level
        if (typeof containers !== 'undefined') {
            var found = false;

            for (i = 0; i < containers.length; i++) {
                if (containers[i].type === 'container' && containers[i].name === name) {
                    return containers[i];
                } else {
                    var child_search = self.findTree(name, containers[i].children);
                    return child_search;
                }
            }

            return containers[i];
        } else {
            return {};
        }


    }

    NavigationApiController.prototype.getNavigation = function(cb) {
        var self = this;
        var ooptions = this.processQuery();
        var menuService = new pb.TopMenuService();
        var options = {
            currUrl: this.req.url,
            site: this.site,
            session: this.session,
            ls: this.ls,
            activeTheme: this.activeTheme
        };


        // console.log("ooptions", ooptions);
        self.sectionService.getFormattedSections(options.ls, options.currUrl, function(err, formattedSections) {
            // console.log(formattedSections);
            if (typeof ooptions.where !== 'undefined' && typeof ooptions.where.name !== 'undefined') {
                // console.log("formattedSections", formattedSections)
                // console.log(ooptions.where.name);
                var container = self.findTree(ooptions.where.name, formattedSections);
                var promise = self.populateTree(container);

                promise.then(function(data) {
                    console.log(container);
                    self.handleGet(cb)(null, container)
                })
            } else {
                self.handleGet(cb)(null, formattedSections);
            }
            // cb(null, formattedSections);
        });
    };

    NavigationApiController.getRoutes = function(cb) {
        var routes = [{
            method: 'get',
            path: "/api/content/navigation",
            handler: "getNavigation",
            content_type: 'application/json',
            auth_required: true,
            inactive_site_access: true,
            access_level: pb.SecurityService.ACCESS_WRITER,
            controller: path.join(pb.config.docRoot, 'plugins/mcctheme/controllers/api/content/navigation_api_controller.js'),
            request_body: ['application/json']
        }];
        cb(null, routes);
    };
    //exports
    return NavigationApiController;
};
