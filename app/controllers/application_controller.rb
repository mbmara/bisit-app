class ApplicationController < ActionController::Base
  	#protect_from_forgery with: :exception

  def angular
		render 'layouts/application'
	end

  def authorize_request
    begin
      @header = request.headers['Authorization']
      if @header == 0
        json_response false,"Invalid Token"
        return false
      end
      @current_user = User.find(decoded_auth_token[:id]) if decoded_auth_token
      #verify if token is exist
      unless @current_user.present?
        json_response false,"Invalid Token"
        return false
      end
      if @current_user.user_token.nil?
        json_response false,"Invalid Token"
        return false
      end
      #check token expiration time
      unless @current_user.user_token.token_created_at >=  30.minutes.ago
        @current_user.user_token.destroy
        json_response false,"Invalid Token"
        return false
      end
      @current_user.user_token.update_expiration
      @current_user.user_token.save
    rescue
      json_response false,"Invalid Token"
      return false
    end
  end

  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(@header)
  end

	def json_response a,b
		render :json => {status:a,payload:b}, :status=>200
	end
  def to_md5 str
    Digest::MD5.hexdigest(str)[0,19].upcase
	end
end
