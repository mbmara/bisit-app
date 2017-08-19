json.users @users do |user|
    json.extract! user, :id, :created_at
    json.role user.user_role.name
    json.facility user.facilities unless user.super_admin?
    json.facility [{name:"All Facilities"}] if user.super_admin?
    json.name  user.profile.nil? ? "System Default" : user.profile.fullname
end
json.roles @roles, :id, :name
json.facilities @facilities, :id , :name
