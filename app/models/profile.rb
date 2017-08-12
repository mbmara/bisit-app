class Profile < ApplicationRecord
    
    validates_presence_of :fname, :lname, :mname

    def fullname
        "#{lname} #{fname}"
    end
end
