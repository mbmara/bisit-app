if @current_user.super_admin?
  json.facilities Facility.all do |fac|
    json.extract! fac, :id, :name
    json.count fac.companies.count
  end
  json.companies do
    json.array! Company.all do |com|
      json.extract! com, :id, :name , :created_at
      json.facility com.facility.name
    end
  end
else
  json.facilities @current_user.facilities do |fac|
    json.extract! fac, :id, :name
    json.count fac.companies.count
  end
  json.companies do
    @current_user.facilities.each do |fac|
        json.array! fac.companies do |com|
          json.extract! com, :id, :name , :created_at
          json.facility com.facility.name
        end
    end
  end
end
