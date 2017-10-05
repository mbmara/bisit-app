class AddNotifToCompany < ActiveRecord::Migration[5.1]
  def change
  	add_column :companies, :notification, :integer, default:0
  end
end
