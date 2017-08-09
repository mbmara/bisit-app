class ApplicationController < ActionController::Base
  	#protect_from_forgery with: :exception

  	def angular
		render 'layouts/application'
	end

	def json_response a,b
		render :json => {status:a,payload:b}, :status=>200
	end
end
