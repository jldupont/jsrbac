### Status
[![Build Status](https://travis-ci.org/jldupont/jsrbac.svg?branch=master)](https://travis-ci.org/jldupont/jsrbac)

Description
===========

Javascript library for the implementation of role based access control in a web application.



Data Types
==========

Permission
----------

The data type 'permission' is defined as follows:

```javascript	
var whatever_permission = { r: $resource, a: $action }
```

* Where $resource is a string naming a resource e.g. Domain
* Where $action is a string naming an action e.g. Create


Role
----

The data type 'role' is defined as follows:

```javascript
var whatever_role = {
                        a: true | false 
						,p: [$permission1, $permission2, ...]
					};
```
Where 'a' represents the 'admin' flag.  When 'true', this role conveys all permissions.
 
User
----

The data type 'user' is defined as follows:

```javascript
var whatever_user = { roles: [$role1, $role2, ...], ... };
```
As long as the object passed contains the key 'roles', it is considered a 'user' instance.

Server Side
===========

This project complements the following https://github.com/jldupont/pyrbac.   