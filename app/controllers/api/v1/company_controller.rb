class Api::V1::CompanyController < ApplicationController


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

    def company_params
        params.require(:company).permit(:name, :floor, :unit_number, :website, {tags:[]}, :description)
    end
end
