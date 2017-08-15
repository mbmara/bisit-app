class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      	t.string :email
      	t.belongs_to :facility, index:true, default:0
      	t.belongs_to :user_role , index:true
      	t.string :password
      	t.timestamps
    end
  end
end
