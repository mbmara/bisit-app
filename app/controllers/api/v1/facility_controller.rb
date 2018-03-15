class Api::V1::FacilityController < ApplicationController

	before_action :authorize_request, except:[]
    before_action only:[:create, :search, :remove, :update, :removestaff] do 
    	init_permission(3)
    end
    
	def statistic
		data ={};
		if @current_user.super_admin?
			data[:visitors_total_today] = VisitLog.where("created_at > ?", Date.today.beginning_of_day).count
			data[:visitors_login_today] = VisitLog.where("created_at > ? AND state=?", Date.today.beginning_of_day,0).count
			data[:visitors_logout_today] = VisitLog.where("created_at > ? AND state=?", Date.today.beginning_of_day,1).count
			data[:visitors_all] = VisitLog.count
			data[:companies_total] = Company.count
			data[:users_total] = User.count
			data[:facilities] = Facility.count
 			
		else
			fac = @current_user.facilities.last
			data[:visitors_total_today] = fac.visit_logs.where("created_at > ?", Date.today.beginning_of_day).count
			data[:visitors_login_today] = fac.visit_logs.where("created_at > ? AND state = ?", Date.today.beginning_of_day,0).count
			data[:visitors_logout_today] = fac.visit_logs.where("created_at > ? AND state = ?", Date.today.beginning_of_day,1).count
			data[:visitors_all] = fac.visit_logs.count
			data[:companies_total] = fac.companies.count
			data[:users_total] = fac.users.count
		end
		json_response true,data
	end
	def index
		@facilities = Facility.all.order id: :desc	
	end

	def create
		fac = Facility.new
		fac.name = facility_params[:name]
		if fac.save
			json_response true,"created"
		else
			json_response false,fac.errors
		end
	end

	private 

	def facility_params
		params.require(:facility).permit(:name)
	end
end
