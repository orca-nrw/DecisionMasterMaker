class StepwiseDiagnosticNodesController < ApplicationController
  before_action :set_stepwise_diagnostic_node, only: %i[ show edit update destroy ]

  # GET /stepwise_diagnostics or /stepwise_diagnostics.json
  def index
    @stepwise_diagnostics = StepwiseDiagnostic.all
  end

  # GET /stepwise_diagnostics/1 or /stepwise_diagnostics/1.json
  def show
  end

  # GET /stepwise_diagnostics/new
  def new
    @stepwise_diagnostic_node = StepwiseDiagnosticNode.new
  end

  # GET /stepwise_diagnostics/1/edit
  def edit
  end

  # POST /stepwise_diagnostics or /stepwise_diagnostics.json
  def create
    @stepwise_diagnostic_node = StepwiseDiagnosticNode.new(stepwise_diagnostic_node_params)

    respond_to do |format|
      if @stepwise_diagnostic_node.save
        format.html { redirect_to stepwise_diagnostic_node_url(@stepwise_diagnostic_node), notice: "Stepwise Diagnostic was successfully created." }
        format.json { render :show, status: :created, location: @stepwise_diagnostic_node }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @stepwise_diagnostic_node.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /stepwise_diagnostics/1 or /stepwise_diagnostics/1.json
  def update
    respond_to do |format|
      if @stepwise_diagnostic_node.update(stepwise_diagnostic_node_params)
        format.html { redirect_to edit_stepwise_diagnostic_node_url(@stepwise_diagnostic_node), notice: "Stepwise Diagnostic was successfully updated." }
        format.json { render :show, status: :ok, location: @stepwise_diagnostic_node }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @stepwise_diagnostic_node.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /stepwise_diagnostics/1 or /stepwise_diagnostics/1.json
  def destroy
    @stepwise_diagnostic_node.destroy

    respond_to do |format|
      format.html { redirect_to stepwise_diagnostic_nodes_url, notice: "Stepwise Diagnostic was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_stepwise_diagnostic_node
      @stepwise_diagnostic_node = StepwiseDiagnosticNode.find(params[:id])
      @stepwise_diagnostic_node.diagnostic_types.reload
    end

    # Only allow a list of trusted parameters through.
    def stepwise_diagnostic_node_params
      params.require(:stepwise_diagnostic_node).permit(:prompt, :button_prompt, :step_count)
    end
end
