class CreateFacilityContents < ActiveRecord::Migration[5.1]
  def change
    create_table :facility_contents do |t|
    	t.belongs_to :user
    	t.belongs_to :facility
      	t.timestamps
    end
  end
end
