Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :users, only: :create
      resources :sessions, only: [:create, :destroy]
      resources :calculations, only: [:index, :show, :create, :destroy]
    end
  end

  get "", to: "pages#home"
  get "users/new", to: "pages#home"
  get "sessions/new", to: "pages#home"
  get "calculations", to: "pages#home"
end
