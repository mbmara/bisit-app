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
		name:"Facilities",
		route:"index.facility",
		url:"facility"
	},
	{
		name:"Companies",
		route:"index.company",
		url:"company"
	},
	{
		name:"Users",
		route:"index.user",
		url:"user"
	},
	{
		name:"Visitors",
		route:"index.visitor",
		url:"visitor"
	},
	{
		name:"Identifications",
		route:"index.identification",
		url:"identification"
	},
	{
		name:"Visitors Kiosk",
		route:"kiosk",
		url:"kiosk"
	},
	{
		name:"Self Assesment",
		route:"self-assesment",
		url:"self-assesment"
	},
	{
		name:"Visitor List",
		route:"index.visitor-list",
		url:"visitor-list"
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
		{user_role_id:1,policy_id:6,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		#{user_role_id:1,policy_id:7,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},

		{user_role_id:2,policy_id:1,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		{user_role_id:2,policy_id:3,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		{user_role_id:2,policy_id:4,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		{user_role_id:2,policy_id:5,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		{user_role_id:2,policy_id:6,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		{user_role_id:2,policy_id:7,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		#{user_role_id:3,policy_id:1,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		#{user_role_id:3,policy_id:5,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		#{user_role_id:3,policy_id:6,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		{user_role_id:3,policy_id:7,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		{user_role_id:3,policy_id:8,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
		{user_role_id:3,policy_id:9,pcreate:1,pread:1,pupdate:1,pdelete:1,generated_by:'system'},
])
