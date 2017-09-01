class Api::V1::UserController < ApplicationController
  require 'securerandom'
  before_action :authorize_request, except:[:login,:recovery_code,:resetpassword]
  before_action only:[:create] {init_permission(4)}

  def search
    filter = {}
    @user_name = search_params[:name]
    if @current_user.super_admin?
      filter[:facility_id] = search_params[:facility] if search_params[:facility].present?
    else
      filter[:facility_id] = @current_user.facilities[0].id
    end
    filter[:user_role_id] = search_params[:role] if search_params[:role].present?
    @users = User.where(filter)
    p "--"
    p "--"
    p "--"
    p @users.inspect
  end

  def resetpassword
    if recover_params[:code].empty?
      json_response false,{Code: "is required"}
      return false
    end
    if recover_params[:password] != recover_params[:password1]
      json_response false,{Verify:" your password correctly"}
      return false
    end

    user = User.find_by_recovery_code  recover_params[:code]

    if user.present?
      if user.email === recover_params[:email]
         user.password = to_md5 recover_params[:password]
         user.recovery_code = ""
         user.save
         json_response true, "Password has been successfuly resetted"
      else
          json_response false,{Invalid: "recovery code"}
      end
    else
      json_response false,{Invalid: "recovery code"}
    end

  end
  def recovery_code
    user = User.find_by_email recover_params[:email]
    if user.present?
        user.recovery_code = "#{SecureRandom.hex(4)}#{Time.zone.now.to_i}"
        user.save
        UserMailer.send_code(user).deliver_later
        json_response true,"ok"
    else
      json_response false,{Account: 'cannot be recovered'}
    end

  end

  def authenticate
    @permission = @current_user.user_role
  end
  def logout
    @current_user.user_token.destroy
    json_response true,"bye"
  end
  def login
    @user = User.find_by_email login_params[:email]
    unless @user.present?
      json_response false, {Invalid: "Account"}
      return false
    end
    unless @user.password === to_md5( login_params[:password] )
      json_response false, {Invalid: "Account"}
      return false
    end
    # p "-----------------"
    # p "-----------------"
    # p "-----------------"
    # p "authentication"
    # UserMailer.send_code().deliver_later
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

    if @current_user.super_admin?
      @users = User.all.order id: :desc
      @roles = UserRole.all
      @facilities = Facility.all
    else
      @users = @current_user.facilities[0].facility_contents
      @roles = UserRole.where("id > ? ",1)
      @facilities = @current_user.facilities
    end
  end
  def create
    if !@current_user_permission[0][:pcreate]
      json_response false,{Account: "is not allowed to create"}
      return false
    end
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
      user.facility_id = user_params[:facility] if user_params[:facility].present?
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
        profile.user_type = :user
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
  def search_params
    params.require(:search).permit(:facility, :role, :name)
  end
  def recover_params
    params.require(:email).permit(:email, :password, :code, :password1)
  end

  def user_params
    params.require(:user).permit(:email, :password, :password1, :fname, :lname, :mname, :facility, :role, :contact)
  end

  def login_params
    params.require(:user).permit(:email, :password )
  end
end
