class Profile < ApplicationRecord
#    belongs_to :visitor
    include SearchCop

    validates_presence_of :fname, :lname, :mname

    enum user_type: [:user, :staff, :visitor]

    search_scope :search do
	    attributes :fname, :lname, :mname
	  end

    def fullname
        "#{lname} #{fname}"
    end
end
