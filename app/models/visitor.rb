class Visitor < ApplicationRecord
	has_one :profile
	has_many :visit_logs
end
