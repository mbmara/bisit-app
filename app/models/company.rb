class Company < ApplicationRecord
    validates_presence_of :name, :unit_number, :floor
    has_many :staffs
    has_many :tags
    has_many :visit_logs
    belongs_to :facility
end
