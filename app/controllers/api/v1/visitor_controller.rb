
class Api::V1::VisitorController < ApplicationController
	before_action :authorize_request, except:[]
	#before_action only:[:create, :search, :remove, :update] {init_permission(3)}
	require 'base64'
	require 'chikka'

	def reject
		log = VisitLog.find approve_params[:id]
		log.state = :rejected
		log.save
		json_response true,"ok"
	end

	def approve
		idz = @current_user.facilities[0].identifications.where("code = ?",approve_params[:identifiction_code]).last
		if idz.nil?
			json_response false,{Identification:" does not exist"	}
			return false
		end
		if idz.in_use
			json_response false,{ Identification:" is in use! Please logout first"	}
			return false
		end
		if idz.facility_id != @current_user.facilities[0].id
			json_response false,{Identification: "Does not belongs to this facility"}
			return false
		end
		log = VisitLog.find approve_params[:id]

		
		log.state = :login
		log.identification_id 	= idz.id
		log.save
		if log.save
			idz.in_use = true
			idz.save
			if log.company.notification === 0
				
				UserMailer.notify_staff(log).deliver_later
				json_response true,"ok"
			else
				begin
					sms_body = "Hi Staff #{log.staff.fullname}, Visitor #{log.profile.fullname} is arriving."

					client_id = "8797a590b66cd3300345f0ba75834c756c9cffd764a467637886a5cee92ae044"
					secret_key = "5e8ebdf79c587e9d547b972b5d99f080a70bf1d0119845f6afab642361dfcc50"
					shortcode = "292906528"
					client = Chikka::Client.new(client_id:client_id, secret_key:secret_key, shortcode:shortcode)
					client.send_message(message:sms_body, mobile_number:log.staff.mobile)

				rescue 
					json_response true,"ok"
				end
				
			end
			
		else
			json_response false,log.errors
		end
		
	end

	def quelist
		@visitors = VisitLog.where("state=?",2)
	end

	def verify
		if @current_user.super_admin?
			json_response false,"Account not appropriate"
		else
			idz = @current_user.facilities[0].identifications.where("code = ?",params[:code]).last
		end
		if idz.present?
			logs = idz.visit_logs.last
			if logs.present?
				if logs.state == "login"
					img = Visitor.find logs.visitor_id
					res = {}
					res[:id] = logs.id
					res[:purpose] = logs.purpose
					res[:name]  = logs.profile.fullname
					res[:image] = img.image
					res[:staff] = logs.staff.fullname
					res[:company] = logs.company.name
					json_response true,res

				else
					json_response false,{Visitor: " is already logout"}
				end
			else
				json_response false,{Code:" is not use"}
			end
		else
			json_response false,{Code: " Does not exist"}
		end
		

	end

	def search
		@visitor_name = search_params[:visitor_name]
		filter = {}
		if @current_user.super_admin?
			filter[:facility_id] = search_params[:facility] if search_params[:facility].present?
		else
			filter[:facility_id] = @current_user.facilities[0].id
		end
		filter[:company_id] = search_params[:company] if search_params[:company].present?
		filter[:state] = search_params[:status] if search_params[:status].present?
		
		if search_params[:date_from].present? && search_params[:date_to].present?
			@visitors = VisitLog.where(filter).where("created_at BETWEEN ? AND ?",Date.parse(search_params[:date_from]).beginning_of_day,Date.parse(search_params[:date_to]).end_of_day)
		end
		if search_params[:date_from].present? && !search_params[:date_to].present?
			@visitors = VisitLog.where(filter).where("created_at > ?",Date.parse(search_params[:date_from]).beginning_of_day)
		end
		if !search_params[:date_from].present? && search_params[:date_to].present?
			@visitors = VisitLog.where(filter).where("created_at < ?",Date.parse(search_params[:date_to]).end_of_day)
		end
		if !search_params[:date_from].present? && !search_params[:date_to].present?
			@visitors = VisitLog.where(filter)
		end
		
	end

	def relogin
		idz = @current_user.facilities[0].identifications.where("code = ?",relogin_params[:identifiction_code]).last

		if !idz.present?
			json_response false,{Invalid:" identification Code"	}
			return false
		end
		if idz.in_use
			json_response false,{ Identification:" is in use! Please logout first"	}
			return false
		end
		if idz.facility_id != @current_user.facilities[0].id
			json_response false,{Identification: "Does not belongs to this facility"}
		end

		vis = Visitor.find relogin_params[:visitor_id]
		if vis.present?
			if vis.visit_logs.last.state=="login"
				json_response false,{Visitor:" is still log In"}
				return false
			end
			log = vis.visit_logs.new
			#create log
			log = vis.visit_logs.new
			log.company_id 	= relogin_params[:company]
			log.staff_id 	= relogin_params[:staff]
			log.user_id 	= 1
			log.facility_id = idz.facility_id
			log.visitor_id 	= relogin_params[:visitor_id]
			log.time_out = 0
			log.purpose = relogin_params[:purpose]
			log.identification_id 	= relogin_params[:identifiction_code]
			log.state = :login
			if log.save
				idz.in_use = true
				idz.save
				json_response true,"ok"
			else
				json_response false,log.errors
			end
		else
			json_response false,{Invalid:" Visitor Records"}
		end
	end
	def find
		if params[:search].present? &&  params[:search]!=""
			@visitors = Profile.where("user_type=?",2).search params[:search]
		else
			@visitors=[]
		end
	end

	def info
		@vis = Visitor.find params[:id]
	end

	def logout
		idz = @current_user.facilities[0].identifications.where("code = ?",params[:code]).last
		if idz.nil?
			json_response false,{Identification:" does not exist"	}
			return false
		end
		if !idz.in_use
			json_response false,{Identification:" already logout"	}
			return false
		end
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
			@facilities = Facility.all.order id: :desc	
			@companies = Company.all.order id: :desc

			# @total_visitors  =  VisitLog.count
			# @total_visitors_today = VisitLog.where("created_at BETWEEN ? AND ?",Date.today.beginning_of_day, Date.today.end_of_day).count
			# @total_visitors_login_today = VisitLog.where("state = ? AND created_at BETWEEN ? AND ?",0,Date.today.beginning_of_day, Date.today.end_of_day).count
			# @total_visitors_logout_today = VisitLog.where("state = ?  AND created_at BETWEEN ? AND ?",1,Date.today.beginning_of_day, Date.today.end_of_day).count

		else
			@visitors = @current_user.facilities[0].visit_logs.order id: :desc
			@companies = @current_user.facilities[0].companies.order id: :desc
			# @total_visitors  =   @current_user.facilities[0].visit_logs.count
			# @total_visitors_today =  @current_user.facilities[0].visit_logs.where("created_at BETWEEN ? AND ?",Date.today.beginning_of_day, Date.today.end_of_day).count
			# @total_visitors_login_today =  @current_user.facilities[0].visit_logs.where("state = ? AND created_at BETWEEN ? AND ?",0,Date.today.beginning_of_day, Date.today.end_of_day).count
			# @total_visitors_logout_today =  @current_user.facilities[0].visit_logs.where("state = ?  AND created_at BETWEEN ? AND ?",1,Date.today.beginning_of_day, Date.today.end_of_day).count

		end

	end

	def login2
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
		log.facility_id = @current_user.facilities[0].id
        log.visitor_id 	= visit.id
		log.time_out = 0
		log.purpose = visitor_params[:purpose]
        log.identification_id 	= 0
		log.state = :pending
        log.save
		
       	data = visitor_params[:visitor_img]
		image_data = Base64.decode64(data['data:image/png;base64,'.length .. -1])

		File.open("#{Rails.root}/public/secret_upload/#{visit.image}", 'wb') do |f|
		  f.write image_data
		end

		staff = Profile.find_by_staff_id visitor_params[:staff]


		#compose message
		sms_body = "Hi Staff #{staff.lname} #{staff.fname} Visitor #{profile.fullname} is arriving."

		client_id = "aa7eb7bbe64144f6d1a4ffeaf56cff5046dc5e0d19def9df029684dd6a871a65"
		secret_key = "cb131172b1cbcf1705c501dafdfb5c1dee0a25f24a94e8c13a485134b27a3d4c"
		shortcode = "2929024482"

		#client = Chikka::Client.new(client_id:client_id, secret_key:secret_key, shortcode:shortcode)
		#client.send_message(message:sms_body, mobile_number:staff.mobile)

		json_response true,"You are now registered"
	end

	def login
		ActiveRecord::Base.transaction do
			#verify indentification
			idz = @current_user.facilities[0].identifications.where("code = ?",visitor_params[:identifiction_code]).last
			if idz.nil?
				json_response false,{Identification:" does not exist"	}
				return false
			end
			if idz.in_use
				json_response false,{ Identification:" is in use! Please logout first"	}
				return false
			end
			if idz.facility_id != @current_user.facilities[0].id
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
					log.facility_id = idz.facility_id
	        log.visitor_id 	= visit.id
					log.time_out = 0
					log.purpose = visitor_params[:purpose]
	        log.identification_id 	= idz.id
					log.state = :login
	        log.save
					idz.in_use = true

					idz.save
	       	data = visitor_params[:visitor_img]
			image_data = Base64.decode64(data['data:image/png;base64,'.length .. -1])

			File.open("#{Rails.root}/public/secret_upload/#{visit.image}", 'wb') do |f|
			  f.write image_data
			end

			staff = Profile.find_by_staff_id visitor_params[:staff]


			#compose message
			sms_body = "Hi Staff #{staff.lname} #{staff.fname} Visitor #{profile.fullname} is arriving."

			client_id = "aa7eb7bbe64144f6d1a4ffeaf56cff5046dc5e0d19def9df029684dd6a871a65"
			secret_key = "cb131172b1cbcf1705c501dafdfb5c1dee0a25f24a94e8c13a485134b27a3d4c"
			shortcode = "2929024482"

			
			json_response true,"visitor is now login"
		end
	end


	private
	def approve_params
		params.require(:visitor).permit(:id, :identifiction_code);
	end
	def search_params
		params.require(:search).permit(:facility, :company, :status, :visitor_name, :date_from, :date_to)
	end
	def relogin_params
		params.require(:visitor).permit(:company, :staff, :purpose, :identifiction_code, :visitor_id)
	end
	def visitor_params
		params.require(:visit).permit(:company, :fname, :lname, :mname, :staff, :identifiction_code, :visitor_img, :purpose)
	end
end
