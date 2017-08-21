class CreateVisitors < ActiveRecord::Migration[5.1]
  def change
    create_table :visitors do |t|
    	t.boolean :status , index:true
        t.string :image
      	t.timestamps
    end
  end
end
