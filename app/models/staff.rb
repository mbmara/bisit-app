class Staff < ApplicationRecord
    validates_presence_of :position, :email_address
    has_one :profile
end
