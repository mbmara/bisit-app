class CreateProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :profiles do |t|
      t.belongs_to :user, index: true
      t.belongs_to :staff, index:true
      t.belongs_to :visitor, index:true
      t.string :fname
      t.string :lname
      t.string :mname
      t.string :mobile
      t.boolean :block, default:false
      t.timestamps
    end
  end
end
