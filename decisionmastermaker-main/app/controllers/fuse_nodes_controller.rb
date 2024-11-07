class FuseNodesController < ApplicationController
  before_action :set_fuse_node, only: %i[ show edit update destroy ]

  # GET /fuse_nodes/1 or /fuse_nodes/1.json
  def show
  end

  # GET /fuse_nodes/1/edit
  def edit
  end

  # PATCH/PUT /fuse_nodes/1 or /fuse_nodes/1.json
  def update
    respond_to do |format|
      if @fuse_node.update(fuse_node_params)
        format.html { redirect_to edit_fuse_node_url(@fuse_node), notice: "Fuse node was successfully updated." }
        format.json { render :show, status: :ok, location: @fuse_node }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @fuse_node.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /fuse_nodes/1 or /fuse_nodes/1.json
  def destroy
    @fuse_node.destroy

    respond_to do |format|
      format.html { redirect_to fuse_nodes_url, notice: "Fuse node was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_fuse_node
      @fuse_node = FuseNode.find(params[:id])
      @fuse_node.anamnesis_questions.reload
    end

    # Only allow a list of trusted parameters through.
    def fuse_node_params
      params.require(:fuse_node).permit(:tries, :question)
    end
end
