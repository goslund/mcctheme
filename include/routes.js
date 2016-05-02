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

//dependencies
var path = require('path');

//exports
module.exports = function Routes(pb){
    return [        
        {
            method: 'get',
            path: "/api/content/navigation",
            handler: "getNavigation",
            content_type: 'application/json',
            auth_required: true,
            inactive_site_access: true,
            access_level: pb.SecurityService.ACCESS_WRITER,
            controller: path.join(pb.config.docRoot, 'plugins/mcctheme/controllers/api/content/navigation_api_controller.js'),
            request_body: ['application/json']
        }
    ];
};
