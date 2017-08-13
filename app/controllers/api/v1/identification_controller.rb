class Api::V1::IdentificationController < ApplicationController


	def index
		@ids = Identification.all	
	end

    def create
    	ids = Identification.new
    	ids.code = identification_params[:serial]
    	
    	if ids.save
    		json_response true,"created"
    	else
    		json_response false,ids.errors
    	end

    end

    private

    def identification_params
    	params.require(:code).permit(:serial)
    end
end
