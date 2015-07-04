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

window.rbac = window.rbac || {};

(function(w){
	
	w.rbac.debug = false;
	
	/*
	 *  Ensures that 'user' has the 'permission'
	 *  
	 *  Go through the list of roles for 'user'
	 *   and determine if 'permission' is listed.
	 *  
	 *  @return true | false
	 */
	var ensure = function(user, permission) {
		
		var target_permission = (""+permission).toLowerCase();
		
		var roles = user.roles || [];
		
		for (var role in roles) {

			for (var a_permission in role) {
				
				// let's avoid unhelpful exceptions 
				var normalized_permission = (""+a_permission).toLowerCase();
				if (normalized_permission == target_permission) {
					return true;
				}
			};
		};
		
		if (w.rbac.debug) {
			console.warn("RBAC: user roles: ", roles);
			console.warn("RBAC: user does not have permission '", target_permission, "'")
		};
		
		return false;
	};
	
	w.rbac.ensure = ensure;
	
})(window);