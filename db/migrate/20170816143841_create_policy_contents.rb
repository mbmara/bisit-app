class CreatePolicyContents < ActiveRecord::Migration[5.1]
  def change
    create_table :policy_contents do |t|

      t.timestamps
    end
  end
end
