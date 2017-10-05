class Api::V1::FacilityController < ApplicationController

	def statistic
		json_response true,"ok"
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
