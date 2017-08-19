class UserRole < ApplicationRecord
  has_many :policy_contents
end
