class Profile < ApplicationRecord
	
    include SearchCop

    validates_presence_of :fname, :lname, :mname

    enum user_type: [:user, :staff, :visitor]

    search_scope :search do
	    attributes :fname, :lname, :mname
	  end

    def fullname
        "#{fname} #{mname} #{lname}"
    end
    def find_matches(search)
        str = search.upcase
        name = "#{fname} #{mname} #{lname}".upcase
        return name[str] ? true : false    
    end
end
