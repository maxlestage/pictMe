class PaymentsController < ApplicationController
  before_action :set_result

  def show
  end

  def create
    service = DiplomaPurchaseService.new(@result, params)
    service.perform
    redirect_to root_path, flash: service.flash
  end

  private

  def set_result
    @result = Result.find params[:result_id]
  end
end
