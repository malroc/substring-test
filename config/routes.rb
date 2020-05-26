Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :users, only: :create
      resources :sessions, only: [:create, :destroy]
      resources :calculations, only: [:index, :show, :create, :destroy]
    end
  end

  get "", to: "pages#home"
  get "sign_up", to: "pages#home"
  get "sign_in", to: "pages#home"
end
