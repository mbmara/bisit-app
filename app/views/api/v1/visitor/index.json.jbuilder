json.visitors @visitors do |v|
  json.extract! v, :visitor_id, :purpose, :created_at, :time_out
  json.elapse v.time_diff_to if v.time_out.present?
  json.profile v.profile.fullname
  json.staff v.staff.fullname
  json.facility v.facility.name
  json.company v.company.name
end
json.total_visitors @total_visitors
json.total_visitors_today @total_visitors_today
json.total_visitors_login_today @total_visitors_login_today
json.total_visitors_logout_today @total_visitors_logout_today
