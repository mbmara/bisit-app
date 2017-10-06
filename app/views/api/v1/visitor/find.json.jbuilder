json.array! @visitors do |v|
	next if !Visitor.find(v.visitor_id).visit_logs.last.present?
	next if Visitor.find(v.visitor_id).visit_logs.last.state==2
  	json.extract! v, :visitor_id, :fullname

end
