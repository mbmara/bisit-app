class AddFacilityIdToStaff < ActiveRecord::Migration[5.1]
  def change
  	add_column :staffs, :facility_id, :integer
  end
end
