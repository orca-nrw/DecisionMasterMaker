class QuizNodesController < ApplicationController
  before_action :set_quiz_node, only: %i[ show edit update destroy ]

  # GET /quiz_nodes or /quiz_nodes.json
  def index
    @quiz_nodes = QuizNode.all
  end

  # GET /quiz_nodes/1 or /quiz_nodes/1.json
  def show
  end

  # GET /quiz_nodes/new
  def new
    @quiz_node = QuizNode.new
  end

  # GET /quiz_nodes/1/edit
  def edit
  end

  # POST /quiz_nodes or /quiz_nodes.json
  def create
    @quiz_node = QuizNode.new(quiz_node_params)

    respond_to do |format|
      if @quiz_node.save
        format.html { redirect_to quiz_node_url(@quiz_node), notice: "Quiz node was successfully created." }
        format.json { render :show, status: :created, location: @quiz_node }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @quiz_node.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /quiz_nodes/1 or /quiz_nodes/1.json
  def update
    respond_to do |format|
      if @quiz_node.update(quiz_node_params)
        format.html { redirect_to edit_quiz_node_url(@quiz_node), notice: "Quiz node was successfully updated." }
        format.json { render :show, status: :ok, location: @quiz_node }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @quiz_node.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /quiz_nodes/1 or /quiz_nodes/1.json
  def destroy
    @quiz_node.destroy

    respond_to do |format|
      format.html { redirect_to quiz_nodes_url, notice: "Quiz node was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_quiz_node
      @quiz_node = QuizNode.find(params[:id])
      @quiz_node.quiz_answers.reload
    end

    # Only allow a list of trusted parameters through.
    def quiz_node_params
      params.require(:quiz_node).permit(:multiple_choice, :question)
    end
end
