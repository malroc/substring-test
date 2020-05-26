class Api::V1::CalculationsController < Api::V1::Controller
  before_action :authorize!
  before_action :set_calculation, only: [:show, :destroy]

  def index
    @calculations = current_user.calculations

    respond_with @calculations
  end

  def show
    respond_with @calculation
  end

  def create
    @calculation = current_user.calculations.create(calculation_params)

    respond_with @calculation
  end

  def destroy
    @calculation.destroy

    respond_with @calculation
  end

  protected

  def set_calculation
    @calculation = current_user.calculations.find(id: params[:id])
  end

  def authorize!
    unless current_user
      render json: {error: "Unauthorized"}, status: :unauthorized
    end
  end

  def calculation_params
    params.require(:calculation).permit(:a, :b)
  end
end
