/*
 * jsrbac.js  
 * 
 * Javascript library for RBAC (Role Based Access Control)
 * 
 * @author Jean-Lou Dupont
 * 
 * Documentation: see the project's README file.
 * 
 */

rbac = {};

// Roles definition
rbac.roles = {};

rbac.debug = false;
	
/*
 *  Define the roles
 * 
 *  var roles = {
 *  
 *    role_key1: role_value1
 *    ,role_key2: role_value2
 *    , ...
 *  };
 *  
 *  Each role is defined given a list of permissions
 *  
 *  role = {
 *     a: true | false
 *    ,p: [ permission1, permission2, ...]
 *  }
 *  
 *  Where 'a' is the admin flag i.e. all permissions == true
 * 
 */
rbac.define_roles = function(roles){
	
	// We need to perform some normalization
	for (var role_name in roles) {
		
		var role_value = roles[role_name];
		
		if (roles.hasOwnProperty(role_name)) {
			var n_role_name = ""+role_name.toLowerCase();
			
			var original_permissions = role_value.p || [];
			var normalized_permissions = [];
			
			for (var index_permission in original_permissions) {
				var permission = original_permissions[index_permission];
				normalized_permissions.push( permission.toLowerCase() );
			};
			
			rbac.roles[n_role_name] = {
					a: role_value.a || false,
					p: normalized_permissions
			}; 
		};
	}
	
};

/*
 *  Ensures that 'user' has the 'permission'
 *  
 *  Go through the list of roles for 'user'
 *   and determine if 'permission' is listed.
 *  
 *  @return true | false
 */
rbac.ensure = function(user, permission) {
	
	var target_permission = (""+permission).toLowerCase();
	
	var roles = user.roles || [];
	
	for (var index in roles) {

		var role_name = roles[index];
		
		// Look-up the role object
		//
		var n_role_name = (""+role_name).toLowerCase();
		
		var role = rbac.roles[n_role_name] || {};
		var permissions = role.p || [];
		var is_admin = role.a || false;

		if (rbac.debug) {
			console.log("RBAC: Checking role: ", n_role_name, ' ('+role_name+') ');
			console.log("RBAC: role entry: ", role);
			console.log("RBAC: permissions: ", permissions);
			console.log("RBAC: admin flag: ", is_admin);
		};
			
		// the 'admin' role has all permissions
		if (is_admin)
			return true;
		
		for (var pindex  in permissions) {
			
			var a_permission = permissions[pindex];
			
			// Should have been normalized in 'define_roles'
			if (a_permission == target_permission) {
				return true;
			}
		};
	};
	
	if (rbac.debug) {
		console.warn("RBAC: user roles: ", roles);
		console.warn("RBAC: user does not have permission '", target_permission, "'")
	};
	
	return false;
};
	
// For the tests 
//
if (typeof module!= 'undefined') {
	module.exports = rbac;
}