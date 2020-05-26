class Api::V1::SessionsController < Api::V1::Controller
  def create
    @user = User.find_by(email: params[:email])&.authenticate(params[:password])

    if @user
      session[:current_user_id] = @user.id
      render json: {current_user_id: @user.id}, status: :created
    else
      render json: {errors: {password: ["invalid email or password"]}},
             status: :unprocessable_entity
    end
  end

  def destroy
    if params[:id] == "current"
      session[:current_user_id] = nil
      head :no_content
    else
      render json: {error: "Not found"}, status: :not_found
    end
  end
end
