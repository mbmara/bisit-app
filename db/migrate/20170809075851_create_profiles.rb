class CreateProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :profiles do |t|
      t.belongs_to :user, index: true
      t.string :fname
      t.string :lname
      t.string :mname
      t.string :mobile
      t.timestamps
    end
  end
end
