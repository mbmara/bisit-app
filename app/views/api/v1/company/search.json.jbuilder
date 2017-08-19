json.companies @companies do |com|
  next if com.facility.nil?
  json.extract! com, :id, :name , :created_at
  json.facility com.facility.name
end
