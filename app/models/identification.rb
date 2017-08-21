class Identification < ApplicationRecord
	belongs_to :facility
	has_many :visit_logs
	validates :code, uniqueness: true, presence: true
end
