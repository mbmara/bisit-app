class Facility < ApplicationRecord
	has_many :companies
	validates_presence_of :name
	validates :name, uniqueness:true
end
