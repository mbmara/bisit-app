class UserToken < ApplicationRecord

  def generate_token(token)
    self.auth_token = token
    self.token_created_at = Time.zone.now
  end
  def update_expiration
    self.update_columns(token_created_at: Time.zone.now)
  end
end
