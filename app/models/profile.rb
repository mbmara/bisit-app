class Profile < ApplicationRecord
    belongs_to :user
    validates_presence_of :fname, :lname, :mname
end
