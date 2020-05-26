class Api::V1::UsersController < Api::V1::Controller
  wrap_parameters :user, include: [:email, :password, :password_confirmation]

  def create
    @user = User.create(user_params)

    session[:current_user_id] = @user.id if @user.errors.blank?

    respond_with @user, location: nil, status: :created
  end

  protected

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
