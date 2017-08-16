class Api::V1::UserController < ApplicationController

  before_action :authorize_request, except:[:login]

  def authenticate
      json_response true,"ok"
  end
  def logout
    @current_user.user_token.destroy
    json_response true,"bye"
  end
  def login
    @user = User.find_by_email login_params[:email]
    unless @user.present?
      json_response false,"Invalid Account"
      return false
    end
    unless @user.password === to_md5( login_params[:password] )
      json_response false,"Invalid Account"
      return false
    end
    token =  JsonWebToken.encode( id:@user.id)
    @user.build_user_token if  @user.user_token.nil?
    @user.user_token.generate_token(token)
    @user.save
    json_response true,token
  end
  def roles
    @roles = UserRole.all
    @facilities = Facility.all

  end
  def index
    @users = User.all.order id: :desc
    @roles = UserRole.all
    @facilities = Facility.all
  end
  def create
    ActiveRecord::Base.transaction do
      user = User.new
      user.user_role_id = user_params[:role]

      if user_params[:role] != 1
        if user_params[:facility].present?
          fc = user.facility_contents.new
          fc.facility_id = user_params[:facility]
          fc.save
        else
          json_response false,{Facility:" is Required"}
          return false
        end
      end

      user.email = user_params[:email]

      unless user_params[:password] === user_params[:password1]
        json_response false,{password:'Confirmation Incorrect'}
        return false
      end
      user.password = to_md5 user_params[:password]

      if user.save

        profile = user.build_profile
        profile.fname = user_params[:fname]
        profile.lname = user_params[:lname]
        profile.mname = user_params[:mname]
        profile.mobile = user_params[:contact]

        if profile.save
          json_response true,"Create Success"
        else
          json_response false,profile.errors
          raise ActiveRecord::Rollback
        end
      else
        json_response false,user.errors
        raise ActiveRecord::Rollback
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password1, :fname, :lname, :mname, :facility, :role, :contact)
  end

  def login_params
    params.require(:user).permit(:email, :password )
  end
end
