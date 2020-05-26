class Api::V1::Controller < ApplicationController
  respond_to :json

  skip_before_action :verify_authenticity_token

  def current_user
    @current_user ||= User.find_by(id: session[:current_user_id])
  end
end
