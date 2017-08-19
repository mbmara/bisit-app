class CreatePolicyContents < ActiveRecord::Migration[5.1]
  def change
    create_table :policy_contents do |t|
      t.belongs_to :user_role
      t.belongs_to :policy
      t.boolean :pcreate
      t.boolean :pread
      t.boolean :pupdate
      t.boolean :pdelete
      t.string :generated_by
      t.timestamps
    end
  end
end
