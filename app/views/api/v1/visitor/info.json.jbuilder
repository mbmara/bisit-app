json.info do
  json.extract! @vis, :image
  json.extract! @vis.profile, :fullname
  json.log @vis.visit_logs do |bb|
    json.extract! bb, :purpose, :created_at
    json.company bb.company.name
    json.staff bb.staff.fullname
  end
end
