class Profile < ApplicationRecord
    belongs_to :user
    validates_presence_of :fname, :lname, :mname

    def fullname
        "#{lname} #{fname}"
    end
end
