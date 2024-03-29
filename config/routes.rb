Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      get 'statistics', to: 'facility#statistic'

      post 'user/create', to: 'user#create'
      get 'user/list', to: 'user#index'
      get 'user/roles', to: 'user#roles'
      post 'user/login', to: 'user#login'
      post 'user/authenticate', to:'user#authenticate'
      post 'user/logout', to:'user#logout'
      post 'user/recovery_code', to: 'user#recovery_code'
      post 'user/resetpassword', to: 'user#resetpassword'
      post 'user/search', to: 'user#search'
      post 'user/remove', to: 'user#remove'
      get   'user/info/:id', to: 'user#info'
      post 'user/update/:id', to:'user#update'
      
      post 'company/create', to: 'company#create'
      get 'company/list', to: 'company#index'
      get 'company/detail/:id', to: 'company#detail'
      post 'company/addstaff', to: 'company#addstaff'
      post 'company/staff', to: 'company#getStaff'
      post 'company/remove', to: 'company#remove'
      post 'company/update', to: 'company#update'
      post 'company/search', to:'company#search'
      post 'company/staff/remove', to: 'company#removestaff'
      post 'company/update_notification/:id', to:'company#update_notification'
      post 'identification/create', to: 'identification#create'
      get 'identification/all', to: 'identification#index'

      post 'visitor/logout', to: 'visitor#logout'
      post 'visitor/login', to: 'visitor#login'
      post 'visitor/login2', to: 'visitor#login2'
      get 'visitor/all', to: 'visitor#index'
      post 'visitor/info', to: 'visitor#info'
      post 'visitor/find', to: 'visitor#find'
      post 'visitor/relogin', to: 'visitor#relogin'
      post 'visitor/search', to: 'visitor#search'
      post 'visitor/verify', to: 'visitor#verify'
      get 'visitor/quelist', to: 'visitor#quelist'
      post 'visitor/approve', to: 'visitor#approve'
      post 'visitor/reject', to: 'visitor#reject'
      post 'visitor/forcelogout', to:'visitor#forcelogout'
      post 'facility/create', to: 'facility#create'
      get 'facility/all', to: 'facility#index'
    end
  end

	root to: 'application#angular'
  	# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
