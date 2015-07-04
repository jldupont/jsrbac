/*
 * jsrbac test cases
 * 
 * @author: jldupont
 */

var should = require('should');

var jsrbac = require("../jsrbac.js");

rbac.debug = false;

rbac.define_roles({
	'Admin': {
		a: true
	}
	,
	'User' : {
		p: ['Domain:Read']
	}
	,
	'Manager': {
		p: ['Domain:Read', 'Domain:Update']
	}
	,
	'Director': {
		p: ['Domain:Create', 'Domain:Read', 'Domain:Update']
	}
});

// ----------------------------------------------------------------- TESTS

it('Admin has all the permissions', function(){
	
	var user = {
		roles: ['ADMIN']
	};
	
	should.equal(rbac.ensure(user, 'whatever_resource:whatever_action'), true);
});


it('User has only the role Domain:Read', function(){
	
	var user = {
		roles: ['user']
	};
	
	should.equal(rbac.ensure(user, 'domain:read'), true);
	should.equal(rbac.ensure(user, 'DOMAIN:READ'), true);
});

it('Manager does not have the permission Domain:Delete', function(){
	
	var user = {
		roles: ['Manager']
	};
	
	should.equal(rbac.ensure(user, 'domain:delete'), false);
});
