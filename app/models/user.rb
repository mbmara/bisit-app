class User < ApplicationRecord
    has_one :profile
    has_one :user_token
    belongs_to :user_role
    has_many :facility_contents
    has_many :facilities, :through => :facility_contents
    validates_presence_of :email, :password

    def super_admin?
    	user_role_id==1
    end
end
