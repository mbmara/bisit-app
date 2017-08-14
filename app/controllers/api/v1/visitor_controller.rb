class Api::V1::VisitorController < ApplicationController

	require 'base64'
	require 'chikka'

	def login
		ActiveRecord::Base.transaction do
			visit = Visitor.create

			profile 	  = visit.build_profile 
			profile.fname = visitor_params[:fname]
	        profile.lname = visitor_params[:lname]
	        profile.mname = visitor_params[:mname]

	        profile.save

	        #create log
	        log = VisitLog.new
	        log.company_id 	= visitor_params[:company]
	        log.staff_id 	= visitor_params[:staff]
	        log.user_id 	= 1
	        log.visitor_id 	= visit.id
	        log.identification_id 	= visitor_params[:identifiction_code]
	    
	        log.save
	    		
	       	data = visitor_params[:visitor_img]
			image_data = Base64.decode64(data['data:image/png;base64,'.length .. -1])

			File.open("#{Rails.root}/public/visitor_#{visit.id}.png", 'wb') do |f|
			  f.write image_data
			end

			staff = Profile.find_by_staff_id visitor_params[:staff]
			

			#compose message
			sms_body = "Hi Staff #{staff.lname} #{staff.fname} Visitor #{profile.fullname} is arriving"
			
			#client = Chikka::Client.new(client_id:'8797a590b66cd3300345f0ba75834c756c9cffd764a467637886a5cee92ae044', secret_key:'5e8ebdf79c587e9d547b972b5d99f080a70bf1d0119845f6afab642361dfcc50', shortcode:'292906528')
			#client.send_message(message:sms_body, mobile_number:staff.mobile)
			
			json_response true,"visitor is now login"
		end
	end


	private 

	def visitor_params
		params.require(:visit).permit(:company, :fname, :lname, :mname, :staff, :identifiction_code, :visitor_img)
	end
end
