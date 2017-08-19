json.status true
json.user_role @current_user.user_role, :name
json.profile @current_user.profile.nil? ? "System Default" : @current_user.profile.fullname
json.permission do
  json.extract! @permission, :id

  json.objects @permission.policy_contents do |pem|
    json.extract! pem, :pcreate, :pread, :pupdate, :pdelete
    json.extract! pem.policy, :name, :url, :route
  end
end
