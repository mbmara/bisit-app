Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'user/create', to: 'user#create'
      get 'user/list', to: 'user#index'

      post 'company/create', to: 'company#create'
      get 'company/list', to: 'company#index'
      get 'company/detail/:id', to: 'company#detail'
      post 'company/addstaff', to: 'company#addstaff'
      
    end
  end
  
	root to: 'application#angular'
  	# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
