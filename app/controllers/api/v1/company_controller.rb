class Api::V1::CompanyController < ApplicationController

    before_action :authorize_request, except:[]
    
    def update_notification
      com = Company.find params[:id]
      com.notification = params[:notification]
      com.save
      json_response true,"Updated"
      
    end

    def removestaff
      if !@current_user_permission[0][:pdelete]
        json_response false,{Account: "is not allowed to delete"}
        return false
      end
      staff = Company.find(params[:company_id]).staffs.where({id:params[:staff_id]}).last.destroy
      json_response true,"ok"
    end

    def search
      if @current_user.super_admin?
        @companies = Company.where("name like ?","%#{search_params[:search]}%")
      else

        @companies = @current_user.facilities[0].companies.where("name like ?","%#{search_params[:search]}%")
      end
    end

    def update
      if !@current_user_permission[0][:pupdate]
        json_response false,{Account: "is not allowed to update"}
        return false
      end
      if @current_user.super_admin?
        company = Company.find(company_params[:id]).update company_params
      else
        company = @current_user.facilities[0].companies.where("id=?",company_params[:id]).update company_params
      end

      json_response true,"updated"
    end
    def remove
      if !@current_user_permission[0][:pdelete]
        json_response false,{Account: "is not allowed to delete"}
        return false
      end
      if @current_user.super_admin?
        Company.destroy params[:id]
        json_response true,"deleted"
      else
        @current_user.facilities[0].companies.delete params[:id]
        json_response true,"deleted"
      end
    end

    def getStaff
        @staffs = Company.find(params[:id]).staffs
    end
    def addstaff
        ActiveRecord::Base.transaction do
            if @current_user.super_admin?
              
              comStaff = Company.find(staff_params[:company_id]).staffs.new
              comStaff.position = staff_params[:position]
              comStaff.facility_id = comStaff.facility_id

            else
              fac = @current_user.facilities.last
              comStaff = Company.find(staff_params[:company_id]).staffs.new
              
              if fac.id != comStaff.facility_id
                json_response false,{Unauthrorized:" Access of Facility"}
                return false
              end
              comStaff.facility_id = comStaff.facility_id
              comStaff.position = staff_params[:position]

            end
            comStaff.email_address = staff_params[:email_address]
            if comStaff.save
                prof = comStaff.build_profile
                prof.user_id = 0
                prof.fname = staff_params[:fname]
                prof.lname = staff_params[:lname]
                prof.mname = staff_params[:mname]
                prof.mobile = staff_params[:contact]
                prof.user_type = :staff
                if prof.save
                    json_response true,"New Staff Added"
                else
                    json_response false,prof.errors
                    raise ActiveRecord::Rollback
                end
            else
              json_response false,comStaff.errors
            end
        end
    end
    def detail
        @company = Company.find params[:id]

        # if @company.present?
        #     json_response true,@company
        # else
        #     json_response false,{Company:' does not exist'}
        # end

    end
    def index
      # if @current_user.super_admin?
      #   @companies = Company.all.order id: :desc
      # else
      #   @companies = []
      #   @current_user.facilities.each do |fac|
      #     @companies << fac.companies
      #   end
      #   p "----"
      #   p @companies
      # end

    end
    def create
        ActiveRecord::Base.transaction do
            if @current_user.super_admin?
              company = Company.new;
              company.facility_id = company_params[:facility_id]
            else
              facilities = @current_user.facilities

              if !facilities.present?
                json_response false,{Account:" does not belongs to any facilities"}
                return false
              end
              fac = Facility.find facilities[0][:id]
              company = fac.companies.new
            end

            if !@current_user_permission[0][:pcreate]
              json_response false,{Account: "is not allowed to create"}
              return false
            end

            company.name = company_params[:name]
            company.unit_number = company_params[:unit_number]
            company.floor = company_params[:floor]
            company.website = company_params[:website]
            company.description = company_params[:description]

            if company.save
                # company_params[:tags].each do |tag|
                #     company.tags.create content:tag
                # end
                json_response true,"ok"
            else
                json_response false,company.errors
                raise ActiveRecord::Rollback
            end
        end
    end

    private
    def search_params
      params.permit(:search);
    end

    def staff_params
        params.require(:staff).permit( :position, :fname, :lname, :mname , :contact, :company_id, :email_address )
    end
    def company_params
        params.require(:company).permit(:id,:name, :floor, :unit_number, :website,:description, :facility_id)
    end
end
