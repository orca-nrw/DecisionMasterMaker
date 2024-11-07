class DiagnosticTypesController < ApplicationController
  before_action :set_stepwise_diagnostic_node, only: %i[new create]
  before_action :set_diagnostic_type, only: %i[edit update show destroy]

  def index; end

  def new
    @diagnostic_type = DiagnosticType.new
    @diagnostic_type.points = []
    @stepwise_diagnostic_node.step_count.times do
      @diagnostic_type.points << 0
    end
  end

  def edit; end

  def create
    @diagnostic_type = @stepwise_diagnostic_node.diagnostic_types.build(diagnostic_type_params)

    respond_to do |format|
      if @diagnostic_type.save
        format.html { redirect_to new_stepwise_diagnostic_node_diagnostic_type_path(@stepwise_diagnostic_node, @diagnostic_type), notice: "Diagnostic was successfully created." }
        format.json { render :show, status: :created, location: @stepwise_diagnostic }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @stepwise_diagnostic.errors, status: :unprocessable_entity }
      end
    end
  end

  def show; end

  def update
    respond_to do |format|
      if @diagnostic_type.update(diagnostic_type_params)
        format.html { redirect_to diagnostic_type_path(@diagnostic_type), notice: "Diagnostic was successfully created." }
        format.json { render :show, status: :created, location: @stepwise_diagnostic }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @stepwise_diagnostic.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    stepwise_diagnostic_node = @diagnostic_type.stepwise_diagnostic_node
    @diagnostic_type.destroy

    respond_to do |format|
      format.html { head :no_content, notice: "Diagnose wurde gelöscht" }
      format.json { head :no_content }
    end
  end

  private

  def set_diagnostic_type
    @diagnostic_type = DiagnosticType.find(params[:id])
    @diagnostic_type.attachments.reload
  end

  def set_stepwise_diagnostic_node
    @stepwise_diagnostic_node = StepwiseDiagnosticNode.find(params[:stepwise_diagnostic_node_id])
  end

  def diagnostic_type_params
    params.require(:diagnostic_type).permit(:title, :result, :points => [])
  end
end
