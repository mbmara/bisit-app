class CreateCompanies < ActiveRecord::Migration[5.1]
  def change
    create_table :companies do |t|
      t.belongs_to :facility
      t.string :name
      t.integer :floor
      t.string :unit_number
      t.string :website
      t.string :description
      t.timestamps
    end
  end
end
