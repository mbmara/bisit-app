class Identification < ApplicationRecord
	belongs_to :facility
	has_many :visit_log
	validates :code, uniqueness: true, presence: true
end
