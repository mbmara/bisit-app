json.identifications @ids do |idm|
  json.extract! idm, :id, :code, :status, :in_use, :created_at, :facility_id
  json.facility idm.facility.name
end
json.facilities @facilities do |fac|
  json.extract! fac, :id , :name
  json.count fac.identifications.count
end
