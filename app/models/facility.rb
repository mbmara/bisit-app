class Facility < ApplicationRecord
	has_many :companies
	has_many :identifications
	has_many :visit_logs
	has_many :users
	has_many :facility_contents
	
	validates_presence_of :name
	validates :name, uniqueness:true
end
