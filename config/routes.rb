Rails.application.routes.draw do

  scope '/api' do
    get '/home', to: 'home#index'
    resources :jobs, only: [:index, :show]
    resources :events, only: [:index, :show, :create, :update]
    resources :images, only: [:index, :show, :create]
    resources :semesters, only: [:index, :show]
    resources :brothers, only: [:index, :show, :update]
    resources :users
    devise_for :users, path: '/devise', defaults: { format: :json }
  end

  mount_ember_app :frontend, to: '/'

end
