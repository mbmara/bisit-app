class VisitLog < ApplicationRecord
	has_many :visitors
	belongs_to :profile, class_name:"Profile", primary_key:"visitor_id",foreign_key: "visitor_id"
	#has_one :person_name, class_name:"Gcc::PersonName", primary_key: "Id", foreign_key: "PersonId"
end
