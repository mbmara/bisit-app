class CreateIdentifications < ActiveRecord::Migration[5.1]
  def change
    create_table :identifications do |t|
    	t.string :code
    	t.boolean :in_use, default:false
    	t.boolean :status, default:true
      	t.timestamps
    end
  end
end
