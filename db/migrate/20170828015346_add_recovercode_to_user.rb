class AddRecovercodeToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :recovery_code, :string
  end
end
