class Facility < ApplicationRecord
	has_many :companies
	validates_presence_of :name
end
