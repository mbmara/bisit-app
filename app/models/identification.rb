class Identification < ApplicationRecord
	belongs_to :facility
	validates :code, uniqueness: true, presence: true
end
