json.array! @visitors do |v|
  json.extract! v, :visitor_id, :fullname
  # next if v.visitor.nil?
  # json.info v.visitor
  # json.log v.visitor.visit_logs do |v|
  #   json.staff v.staff.fullname
  #   json.facility v.facility.name
  #   json.company v.company.name
  # end
end
