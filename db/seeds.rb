p "-- CREATING ROLES--"
UserRole.create([
	{name:"Super Admin"},
	{name:"Building Admin"},
	{name:"Receptionist"}
])
p "-- CREATING POLICY--"
Policy.create([
	{
		name:"Dashboard",
		route:"index",
		url:"index"
	},
	{
		name:"Facility",
		route:"index.facility",
		url:"facility"
	},
	{
		name:"Company",
		route:"index.company",
		url:"company"
	},
	{
		name:"User",
		route:"index.user",
		url:"user"
	},
	{
		name:"Visitor",
		route:"visitor",
		url:"visitors"
	},
	{
		name:"Identification",
		route:"index.identification",
		url:"identification"
	}
])
p "-- CREATING INITIAL USER--"
User.create({
		email:'tearhear18@gmail.com',
		password:'4297F44B13955235245',
		user_role_id:1
})
p "-- CREATING SUPER ADMIN ROLE POLICY--"
PolicyContent.create([
		{user_role_id:1,policy_id:1,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		{user_role_id:1,policy_id:2,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		{user_role_id:1,policy_id:3,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		{user_role_id:1,policy_id:4,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		{user_role_id:1,policy_id:5,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		{user_role_id:1,policy_id:6,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'}
		{user_role_id:2,policy_id:3,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'}
])
