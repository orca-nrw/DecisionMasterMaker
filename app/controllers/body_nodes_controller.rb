class BodyNodesController < ApplicationController
  before_action :set_body_node, only: %i[ show edit update destroy ]

  # GET /body_nodes or /body_nodes.json
  def index
    @body_nodes = BodyNode.all
  end

  # GET /body_nodes/1 or /body_nodes/1.json
  def show
  end

  # GET /body_nodes/new
  def new
    @body_node = BodyNode.new
  end

  # GET /body_nodes/1/edit
  def edit
  end

  # POST /body_nodes or /body_nodes.json
  def create
    @body_node = BodyNode.new(body_node_params)

    respond_to do |format|
      if @body_node.save
        format.html { redirect_to body_node_url(@body_node), notice: "Body node was successfully created." }
        format.json { render :show, status: :created, location: @body_node }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @body_node.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /body_nodes/1 or /body_nodes/1.json
  def update
    respond_to do |format|
      if @body_node.update(body_node_params)
        format.html { redirect_to edit_body_node_url(@body_node), notice: "Body node was successfully updated." }
        format.json { render :show, status: :ok, location: @body_node }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @body_node.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /body_nodes/1 or /body_nodes/1.json
  def destroy
    @body_node.destroy

    respond_to do |format|
      format.html { redirect_to body_nodes_url, notice: "Body node was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_body_node
      @body_node = BodyNode.find(params[:id])
      @body_node.body_examinations.reload
    end

    # Only allow a list of trusted parameters through.
    def body_node_params
      params.require(:body_node).permit(:tries)
    end
end
