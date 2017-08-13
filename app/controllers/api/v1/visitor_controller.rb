class Api::V1::VisitorController < ApplicationController

	require 'base64'

	def login

		file_name = "myfilename.png"
		File.open("public/#{file_name}", 'wb') do |file|
		    file.write( Base64.decode64(visitor_params[:visitor_img]))
		end

		json_response true,visitor_params

		
	end


	private 

	def visitor_params
		params.require(:visit).permit(:company, :fname, :lname, :mname, :staff, :identifiction_code, :visitor_img)
	end
end
