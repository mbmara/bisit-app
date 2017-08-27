json.status true
json.user_role @current_user.user_role, :name
json.profile @current_user.profile.nil? ? "System Default" : @current_user.profile.fullname
json.facility @current_user.facilities[0], :name, :id unless @current_user.facilities.length==0
json.permission do
  json.extract! @permission, :id
  json.objects @permission.policy_contents do |pem|
    json.extract! pem, :pcreate, :pread, :pupdate, :pdelete
    json.extract! pem.policy, :name, :url, :route
  end
end
