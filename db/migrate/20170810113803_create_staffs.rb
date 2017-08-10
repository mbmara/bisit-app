class CreateStaffs < ActiveRecord::Migration[5.1]
  def change
    create_table :staffs do |t|
      t.belongs_to :company, index:true
      t.string :position
      t.timestamps
    end
  end
end
