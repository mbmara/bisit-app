class CreateVisitLogs < ActiveRecord::Migration[5.1]
  def change
    create_table :visit_logs do |t|
    	t.belongs_to :company, index:true
    	t.belongs_to :staff, index:true
    	t.belongs_to :user, index:true
    	t.belongs_to :visitor , index:true
    	t.belongs_to :identification, index:true
    	t.datetime :time_in 
    	t.datetime :time_out
      	t.timestamps
    end
  end
end
