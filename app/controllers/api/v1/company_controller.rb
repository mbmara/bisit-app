class Api::V1::CompanyController < ApplicationController


    def addstaff
        comStaff = Company.find(staff_params[:company_id]).staffs.new
        comStaff.position = staff_params[:position]
        
        if comStaff.save
            prof = comStaff.build_profile
            prof.fname = staff_params[:fname]
            prof.lname = staff_params[:lname]
            prof.mname = staff_params[:mname]
            prof.mobile = staff_params[:contact]
            prof.save
            json_response true,"created"
        end
        
    end
    def detail
        @company = Company.find params[:id]

        if @company.present?
            json_response true,@company
        else
            json_response false,{Company:' does not exist'}
        end

    end
    def index
        @companies = Company.all.order id: :desc
        #company.tags.distinct(:content)
    end
    def create
        ActiveRecord::Base.transaction do
            company = Company.new
            company.name = company_params[:name]
            company.unit_number = company_params[:unit_number]
            company.floor = company_params[:floor]
            company.website = company_params[:website]
            company.description = company_params[:description]
            
            if company.save
                company_params[:tags].each do |tag|
                    company.tags.create content:tag
                end
                json_response true,"ok"
            else
                json_response false,company.errors
                raise ActiveRecord::Rollback
            end
        end
    end

    private 

    def staff_params
        params.require(:staff).permit( :position, :fname, :lname, :mname , :contact, :company_id )
    end
    def company_params
        params.require(:company).permit(:name, :floor, :unit_number, :website, {tags:[]}, :description)
    end
end
