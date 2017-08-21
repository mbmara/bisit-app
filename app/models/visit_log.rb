class VisitLog < ApplicationRecord
	include ActionView::Helpers::DateHelper
	has_many :visitors
	belongs_to :profile, class_name:"Profile", primary_key:"visitor_id",foreign_key: "visitor_id"
	belongs_to :staff, class_name:"Profile", primary_key:"staff_id",foreign_key: "staff_id"
	belongs_to :company
	belongs_to :facility
	#has_one :person_name, class_name:"Gcc::PersonName", primary_key: "Id", foreign_key: "PersonId"
	enum state: [:login, :logout]
	def logout
    self.update_columns(time_out: Time.zone.now,state: :logout)
  end
	def time_diff_to
		#((time_out.to_time - created_at.to_time)/1.hour.second).to_i
		distance_of_time_in_words(time_out,created_at)
	end
end
