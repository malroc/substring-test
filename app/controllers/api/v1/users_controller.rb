class Api::V1::UsersController < Api::V1::Controller
  wrap_parameters :user, include: [:email, :password, :password_confirmation]

  def create
    @user = User.create(user_params)

    respond_with @user, location: nil
  end

  protected

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
