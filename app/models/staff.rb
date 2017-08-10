class Staff < ApplicationRecord
    validates_presence_of :position
    has_one :profile
end
