class SelfEvaluationNodesController < ApplicationController
  before_action :set_self_evaluation_node, only: %i[ show edit update destroy ]

  # GET /self_evaluation_nodes or /self_evaluation_nodes.json
  def index
    @self_evaluation_nodes = SelfEvaluationNode.all
  end

  # GET /self_evaluation_nodes/1 or /self_evaluation_nodes/1.json
  def show
  end

  # GET /self_evaluation_nodes/new
  def new
    @self_evaluation_node = SelfEvaluationNode.new
  end

  # GET /self_evaluation_nodes/1/edit
  def edit
  end

  # POST /self_evaluation_nodes or /self_evaluation_nodes.json
  def create
    @self_evaluation_node = SelfEvaluationNode.new(self_evaluation_node_params)

    respond_to do |format|
      if @self_evaluation_node.save
        format.html { redirect_to self_evaluation_node_url(@self_evaluation_node), notice: "Self evaluation node was successfully created." }
        format.json { render :show, status: :created, location: @self_evaluation_node }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @self_evaluation_node.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /self_evaluation_nodes/1 or /self_evaluation_nodes/1.json
  def update
    respond_to do |format|
      if @self_evaluation_node.update(self_evaluation_node_params)
        format.html { redirect_to edit_self_evaluation_node_url(@self_evaluation_node), notice: "Selbstkontrolle erfolgreich aktualisiert" }
        format.json { render :show, status: :ok, location: @self_evaluation_node }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @self_evaluation_node.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /self_evaluation_nodes/1 or /self_evaluation_nodes/1.json
  def destroy
    @self_evaluation_node.destroy

    respond_to do |format|
      format.html { redirect_to self_evaluation_nodes_url, notice: "Self evaluation node was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_self_evaluation_node
      @self_evaluation_node = SelfEvaluationNode.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def self_evaluation_node_params
      params.require(:self_evaluation_node).permit(:step_id, :prompt, :sampleSolution, :score)
    end
end
