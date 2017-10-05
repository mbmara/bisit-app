json.payload do
	json.extract! @company, :id, :name, :description, :website, :floor, :unit_number, :notification
	json.staffs @company.staffs do |cc|
		json.extract! cc, :id, :position
		json.name cc.profile.fullname
		json.contact cc.profile.mobile
	end
	json.visitors @company.visit_logs do |vl|
		json.extract! vl, :id, :time_in, :time_out
		json.name vl.profile.fullname
	end
end
