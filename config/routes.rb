Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'user/create', to: 'user#create'
      get 'user/list', to: 'user#index'
      get 'user/roles', to: 'user#roles'
      post 'user/login', to: 'user#login'
      post 'user/authenticate', to:'user#authenticate'
      post 'user/logout', to:'user#logout'

      post 'company/create', to: 'company#create'
      get 'company/list', to: 'company#index'
      get 'company/detail/:id', to: 'company#detail'
      post 'company/addstaff', to: 'company#addstaff'
      post 'company/staff', to: 'company#getStaff'
      post 'company/remove', to: 'company#remove'
      post 'company/update', to: 'company#update'
      post 'company/search', to:'company#search'


      post 'identification/create', to: 'identification#create'
      get 'identification/all', to: 'identification#index'

      post 'visitor/logout', to: 'visitor#logout'
      post 'visitor/login', to: 'visitor#login'
      get 'visitor/all', to: 'visitor#index'

      post 'facility/create', to: 'facility#create'
      get 'facility/all', to: 'facility#index'
    end
  end

	root to: 'application#angular'
  	# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
