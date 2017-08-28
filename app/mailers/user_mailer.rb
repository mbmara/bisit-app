class UserMailer < ApplicationMailer
  default from: "visitornotif@satoshi.com.ph"

	def send_code user
    @user = user
		mail(to: @user.email, subject: 'Recovery Code')
	end
end
