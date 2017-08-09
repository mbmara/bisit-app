class Api::V1::UserController < ApplicationController
  
  def index
    @users = User.all.order id: :desc
  end

  def create
    ActiveRecord::Base.transaction do
      user = User.new
      user.email = user_params[:email]

      unless user_params[:password] === user_params[:password1]
        json_response false,{password:'Confirmation Incorrect'}
        return false
      end
      user.password = user_params[:password]
      user.user_type = :admin

      if user.save
        profile = user.build_profile
        profile.fname = user_params[:fname]
        profile.lname = user_params[:lname]
        profile.mname = user_params[:mname]
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
    params.require(:user).permit(:email, :password, :password1, :fname, :lname, :mname)
  end
end
