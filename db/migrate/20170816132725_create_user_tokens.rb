class CreateUserTokens < ActiveRecord::Migration[5.1]
  def change
    create_table :user_tokens do |t|
      t.belongs_to :user, index:true
      t.string :auth_token
      t.datetime :token_created_at
      t.timestamps
    end
  end
end
