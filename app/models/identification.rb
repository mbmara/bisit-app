class Identification < ApplicationRecord
	validates :code, uniqueness: true, presence: true
end
