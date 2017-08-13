class Api::V1::VisitorController < ApplicationController

	require 'base64'
	require 'chikka'

	def login
		
		data = visitor_params[:visitor_img]
		image_data = Base64.decode64(data['data:image/png;base64,'.length .. -1])

		File.open("#{Rails.root}/public/somefilename.png", 'wb') do |f|
		  f.write image_data
		end

		client = Chikka::Client.new(client_id:'8797a590b66cd3300345f0ba75834c756c9cffd764a467637886a5cee92ae044', secret_key:'5e8ebdf79c587e9d547b972b5d99f080a70bf1d0119845f6afab642361dfcc50', shortcode:'292906528')
		client.send_message(message:'This is a test', mobile_number:'639959801216')
		
		json_response true,visitor_params

	end


	private 

	def visitor_params
		params.require(:visit).permit(:company, :fname, :lname, :mname, :staff, :identifiction_code, :visitor_img)
	end
end
