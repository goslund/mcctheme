/*
 Copyright (C) 2016 Montrose Computer Consulting, LLC

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
var Q = require('q');
module.exports = function(pb) {

    //PB dependencies
    var util = pb.util;
    var SecurityService = pb.SecurityService;
    // var CustomObjectService = pb.CustomObjectService;
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
            // console.log("site", self.site);
            self.customObjectService = new pb.CustomObjectService(self.site, true);
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
        console.log(options, this.query);
        options.where = {};
        options.where.name = this.query.name;
        options.render = !!this.query.render; //pass 1 for true, 0 or nothing for false
        return options;
    };

    NavigationApiController.prototype.findTree = function(name, containers) {
        var self = this;
        console.log("Containers!!", containers);
        //check root level
        if (typeof containers !== 'undefined') {
            var found = false;

            for (i = 0; i < containers.length; i++) {
                console.log(containers[i]);
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

    NavigationApiController.prototype.getHeader = function(cb) {
        var self = this;
        console.log("get header!!");
        // console.log("CustomObjectService", self.customObjectService);



        self.customObjectService.loadTypeByName('header', function(error, type) {
            console.log('header', type);
            self.customObjectService.findByType(type.type, {}, function(err, custObjs) {
                // console.log(custObjs);
                self.handleGet(cb)(null, custObjs);
            })

            // self.customObjectService.findByType(type._id, {}, function(err, childObjects) {
            //     // console.log("childObjects", childObjects);
            // });

            // self.customObjectService.fetchChildren('type', {fetch_depth: 1}, 'header', function(err2, objects) {
            //     console.log("objects", objects);
            //     self.handleGet(cb)(null, objects);
            // });
            // console.log('test found', type);
            // self.handleGet(cb)(null, type);
        })

        // self.customObjectService.findTypes(function(err, types) {
        //     // console.log("site custom objects", types);
        //     self.handleGet(cb)(null,types);
        // })
        // // self.customObjectService.loadByName('Montrose Computer Consulting', 'test', {}, function(error, headerdata) {
        // //     console.log("headerdata", headerdata);
        // //     // self.handleGet(cb)(null, "test");
        // // })

        // var ooptions = this.processQuery();
        // var menuService = new pb.TopMenuService();
        // var options = {
        //     currUrl: this.req.url,
        //     site: this.site,
        //     session: this.session,
        //     ls: this.ls,
        //     activeTheme: this.activeTheme
        // };


        // console.log("ooptions", ooptions);
        // self.sectionService.getFormattedSections(options.ls, options.currUrl, function(err, formattedSections) {
        //     // console.log(formattedSections);
        //     if (typeof ooptions.where !== 'undefined' && typeof ooptions.where.name !== 'undefined') {
        //         console.log(ooptions.where.name);
        //         var container = self.findTree(ooptions.where.name, formattedSections);
        //         self.handleGet(cb)(null, container)
        //     } else {
        //         self.handleGet(cb)(null, formattedSections);
        //     }
        //     // cb(null, formattedSections);
        // });
    };

    NavigationApiController.getRoutes = function(cb) {
        var routes = [{
            method: 'get',
            path: "/api/content/header",
            handler: "getHeader",
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
