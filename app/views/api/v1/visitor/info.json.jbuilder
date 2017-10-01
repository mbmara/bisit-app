json.info do
  json.extract! @vis, :image, :id
  json.extract! @vis.profile, :fullname
  json.extract! @vis.visit_logs.last, :purpose
  json.company @vis.visit_logs.last.company.name
  json.staff @vis.visit_logs.last.staff.fullname
end
