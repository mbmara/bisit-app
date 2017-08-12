json.array! @staffs do |s|
    json.extract! s, :id, :position
    json.name s.profile.fullname unless s.profile.nil?
end