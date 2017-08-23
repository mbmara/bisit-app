
class Api::V1::VisitorController < ApplicationController
	before_action :authorize_request, except:[]
	#before_action only:[:create, :search, :remove, :update] {init_permission(3)}
	require 'base64'
	require 'chikka'


	def find
		@visitors = Profile.where("user_type=?",2).search params[:search]
	end

	def info
		@vis = Visitor.find params[:id]

	end

	def logout


		idz = Identification.find_by_code params[:code]

		if idz.present?
			idz.in_use = false
			idz.save
			idz.visit_logs.last.logout
			json_response true,"logout"
		else
			json_response false,{Code: "Invalid"}
		end

	end

	def index
		if @current_user.super_admin?
			@visitors = VisitLog.all.order id: :desc
			@total_visitors  =  VisitLog.count
			@total_visitors_today = VisitLog.where("created_at BETWEEN ? AND ?",Date.today.beginning_of_day, Date.today.end_of_day).count
			@total_visitors_login_today = VisitLog.where("state = ? AND created_at BETWEEN ? AND ?",0,Date.today.beginning_of_day, Date.today.end_of_day).count
			@total_visitors_logout_today = VisitLog.where("state = ?  AND created_at BETWEEN ? AND ?",1,Date.today.beginning_of_day, Date.today.end_of_day).count

		else
			@visitors = @current_user.facilities[0].visit_logs.order id: :desc
			@total_visitors  =   @current_user.facilities[0].visit_logs.count
			@total_visitors_today =  @current_user.facilities[0].visit_logs.where("created_at BETWEEN ? AND ?",Date.today.beginning_of_day, Date.today.end_of_day).count
			@total_visitors_login_today =  @current_user.facilities[0].visit_logs.where("state = ? AND created_at BETWEEN ? AND ?",0,Date.today.beginning_of_day, Date.today.end_of_day).count
			@total_visitors_logout_today =  @current_user.facilities[0].visit_logs.where("state = ?  AND created_at BETWEEN ? AND ?",1,Date.today.beginning_of_day, Date.today.end_of_day).count

		end
	end

	def login
		ActiveRecord::Base.transaction do
			#verify indentification
			idz = @current_user.facilities[0].identifications.where("code = ?",visitor_params[:identifiction_code])

			if !idz.present?
				json_response false,{Invalid:" identification Code"	}
				return false
			end
			if idz[0].in_use
				json_response false,{ Identification:" is in use! Please logout first"	}
				return false
			end
			if idz[0].facility_id != @current_user.facilities[0].id
				json_response false,{Identification: "Does not belongs to this facility"}
			end
					visit = Visitor.new
					visit.image = "#{Time.zone.now.to_i}.png"
					visit.save
					profile 	  = visit.build_profile
					profile.fname = visitor_params[:fname]
	        profile.lname = visitor_params[:lname]
	        profile.mname = visitor_params[:mname]
					profile.user_type = :visitor
	        profile.save

	        #create log
	        log = VisitLog.new
	        log.company_id 	= visitor_params[:company]
	        log.staff_id 	= visitor_params[:staff]
	        log.user_id 	= 1
					log.facility_id = idz[0].facility_id
	        log.visitor_id 	= visit.id
					log.time_out = 0
					log.purpose = visitor_params[:purpose]
	        log.identification_id 	= visitor_params[:identifiction_code]
					log.state = :login
	        log.save
					idz[0].in_use = true

					idz[0].save
	       	data = visitor_params[:visitor_img]
			image_data = Base64.decode64(data['data:image/png;base64,'.length .. -1])

			File.open("#{Rails.root}/public/secret_upload/#{visit.image}", 'wb') do |f|
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
		params.require(:visit).permit(:company, :fname, :lname, :mname, :staff, :identifiction_code, :visitor_img, :purpose)
	end
end
