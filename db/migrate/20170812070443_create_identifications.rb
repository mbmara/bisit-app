class CreateIdentifications < ActiveRecord::Migration[5.1]
  def change
    create_table :identifications do |t|
      t.belongs_to :facility, index:true
      t.string :code
    	t.boolean :in_use, default:false
    	t.boolean :status, default:true
      t.belongs_to :user, index:true
      t.timestamps
    end
  end
end
