class UserMailer < ApplicationMailer
  default from: "visitornotif@satoshi.com.ph"

	def send_code user
    	@user = user
		mail(to: @user.email, subject: 'Recovery Code')
	end
	def notify_staff log 
		@log = log
		user = Staff.find(log.staff_id)
		mail(to: user.email_address, subject: 'New Visitor')
	end
end
