if @visitor_name.present?
	json.visitors @visitors do |v|
		if v.profile.find_matches(@visitor_name)
			json.extract! v, :visitor_id, :purpose, :created_at, :time_out
			json.elapse v.time_diff_to if v.time_out.present?
			json.extract! v.profile, :fullname 
			json.staff v.staff.fullname
		    json.facility v.facility.name
	   	    json.company v.company.name
		end
	end 
else
	json.visitors @visitors do |v|
		json.extract! v, :visitor_id, :purpose, :created_at, :time_out
		json.elapse v.time_diff_to if v.time_out.present?
		json.extract! v.profile, :fullname 
		json.staff v.staff.fullname
	    json.facility v.facility.name
   	    json.company v.company.name
	end 
end

