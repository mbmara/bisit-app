json.array! @users do |user|
    json.extract! user, :id, :created_at
    json.name user.profile.fullname unless user.profile.nil?
end