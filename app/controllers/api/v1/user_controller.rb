class Api::V1::UserController < ApplicationController
  
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
      user.password = user_params[:password]
       
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
end
