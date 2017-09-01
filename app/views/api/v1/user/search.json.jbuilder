if @user_name.present?
  if @current_user.super_admin?
    json.users @users do |user|
        if user.profile.nil? 
          next if @user_name.present?
          json.extract! user, :id, :created_at
          json.role user.user_role.name
          json.facility user.facilities unless user.super_admin?
          json.facility [{name:"All Facilities"}] if user.super_admin?
          json.name  "System Default"
        else
          if user.profile.find_matches(@user_name)
            json.extract! user, :id, :created_at
            json.role user.user_role.name
            json.facility user.facilities unless user.super_admin?
            json.facility [{name:"All Facilities"}] if user.super_admin?
            json.name  user.profile.fullname
          end
        end
    end
  else
    json.users @users do |usr|
      # json.extract! usr, :id
      if usr.user.profile.find_matches(@user_name)
        json.role usr.user.user_role.name
        json.facility usr.user.facilities
        json.created_at usr.user.created_at
        json.name usr.user.profile.fullname
      end
    end
  end
else
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
      json.role usr.user_role.name
      json.facility usr.facilities
      json.created_at usr.created_at
      json.name usr.profile.fullname
    end
  end
end

