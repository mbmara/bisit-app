class CreateTags < ActiveRecord::Migration[5.1]
  def change
    create_table :tags do |t|
      t.belongs_to :company, index:true
      t.belongs_to :user, index:true
      t.string :content
      t.timestamps
    end
  end
end
