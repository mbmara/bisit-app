class Profile < ApplicationRecord

    validates_presence_of :fname, :lname, :mname
    enum user_type: [:user, :staff, :visitor]
    def fullname
        "#{lname} #{fname}"
    end
end
