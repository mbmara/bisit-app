class Company < ApplicationRecord
    validates_presence_of :name, :unit_number, :floor
    has_many :staffs
    has_many :tags
end
