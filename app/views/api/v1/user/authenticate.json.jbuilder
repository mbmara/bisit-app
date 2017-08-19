json.status true
json.permission do
  json.extract! @permission, :id

  json.objects @permission.policy_contents do |pem|
    json.extract! pem, :pcreate, :pread, :pupdate, :pdelete
    json.extract! pem.policy, :name, :url, :route
  end
end
