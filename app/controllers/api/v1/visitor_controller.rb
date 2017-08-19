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

			client_id = "aa7eb7bbe64144f6d1a4ffeaf56cff5046dc5e0d19def9df029684dd6a871a65"
			secret_key = "cb131172b1cbcf1705c501dafdfb5c1dee0a25f24a94e8c13a485134b27a3d4c"
			shortcode = "2929024482"

			#client = Chikka::Client.new(client_id:client_id, secret_key:secret_key, shortcode:shortcode)
			#client.send_message(message:sms_body, mobile_number:staff.mobile)

			json_response true,"visitor is now login"
		end
	end


	private

	def visitor_params
		params.require(:visit).permit(:company, :fname, :lname, :mname, :staff, :identifiction_code, :visitor_img)
	end
end
