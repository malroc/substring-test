Rails.application.routes.draw do
  get "", to: "pages#home"
  get "*path", to: "pages#home"
end
