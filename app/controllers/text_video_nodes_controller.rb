class TextVideoNodesController < ApplicationController
  before_action :set_text_video_node, only: %i[ show edit update destroy ]

  # GET /text_video_nodes/1 or /text_video_nodes/1.json
  def show
  end

  # GET /text_video_nodes/1/edit
  def edit
  end

  # PATCH/PUT /text_video_nodes/1 or /text_video_nodes/1.json
  def update
    respond_to do |format|
      if @text_video_node.update(text_video_node_params)
        format.html { redirect_to edit_text_video_node_url(@text_video_node), notice: "Text video node was successfully updated." }
        format.json { render :show, status: :ok, location: @text_video_node }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @text_video_node.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /text_video_nodes/1 or /text_video_nodes/1.json
  def destroy
    @text_video_node.destroy

    respond_to do |format|
      format.html { redirect_to text_video_nodes_url, notice: "Text video node was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_text_video_node
      @text_video_node = TextVideoNode.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def text_video_node_params
      params.require(:text_video_node).permit(:video, :content)
    end
end
