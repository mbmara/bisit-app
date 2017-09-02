json.user do
	json.extract! @user, :email, :id
	json.facility @user.facility_id
	json.role @user.user_role_id
	json.fname @user.profile.fname
	json.mname @user.profile.mname
	json.lname @user.profile.lname
	json.mobile @user.profile.mobile
end
