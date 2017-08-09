class User < ApplicationRecord
    has_one :profile
    validates_presence_of :email, :password
    enum user_type:[:admin, :receptionist, :user]
end
