class AddEmailaddressToStaff < ActiveRecord::Migration[5.1]
  def change
  	add_column :staffs, :email_address, :string
  end
end
