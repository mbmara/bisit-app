json.array! @visitors do |v|
  json.extract! v, :id, :purpose, :created_at, :time_out
  json.elapse v.time_diff_to if v.time_out.present?
  json.profile v.profile.fullname
  json.staff v.staff.fullname
  json.company v.company.name
end
