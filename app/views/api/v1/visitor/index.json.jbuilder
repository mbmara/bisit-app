json.visitors @visitors do |v|
  json.extract! v, :visitor_id, :purpose, :created_at, :time_out
  json.elapse v.time_diff_to if v.time_out.present?
  json.fullname v.profile.fullname
  json.staff v.staff.fullname
  json.facility v.facility.name
  json.company v.company.name
end
json.facilities @facilities, :name, :id	
json.companies @companies, :name, :id
