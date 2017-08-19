class Facility < ApplicationRecord
	has_many :companies
	has_many :identifications
	validates_presence_of :name
	validates :name, uniqueness:true
end
