if @current_user.super_admin?
  json.users @users do |user|
      json.extract! user, :id, :created_at
      json.role user.user_role.name
      json.facility user.facilities unless user.super_admin?
      json.facility [{name:"All Facilities"}] if user.super_admin?
      json.name  user.profile.nil? ? "System Default" : user.profile.fullname
  end
else
  json.users @users do |usr|
    # json.extract! usr, :id
    json.role usr.user.user_role.name
    json.facility usr.user.facilities
    json.created_at usr.user.created_at
    json.name usr.user.profile.fullname
  end
end
json.roles @roles, :id, :name
json.facilities @facilities, :id , :name
