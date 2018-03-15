class Api::V1::IdentificationController < ApplicationController

	before_action :authorize_request, except:[:login]
    before_action only:[:index, :create] do 
    	init_permission(6)
    end

	def index
		if !@current_user_permission[0][:pread]
			json_response false,{Account: "is not allowed to read"}
			return false
		end
		if @current_user.super_admin?
			@facilities = Facility.all
			@ids = Identification.all
		else
			@facilities = @current_user.facilities
			@ids = @current_user.facilities[0].identifications.all
		end

	end

    def create

		if !@current_user_permission[0][:pcreate]
			json_response false,{Account: "is not allowed to create"}
			return false
		end
		if @current_user.super_admin?
			ids = Facility.find(identification_params[:facility]).identifications.new
    	else	
			ids = Facility.find(@current_user.facilities[0].id).identifications.new
    	end
    	ids.code = identification_params[:serial]
    	if ids.save
    		json_response true,"created"
    	else
    		json_response false,ids.errors
    	end

    end

    private

    def identification_params
    	params.require(:code).permit(:serial, :facility)
    end
end
