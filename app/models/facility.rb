class Facility < ApplicationRecord
	has_many :companies
	has_many :identifications
	has_many :visit_logs
	validates_presence_of :name
	validates :name, uniqueness:true
end
