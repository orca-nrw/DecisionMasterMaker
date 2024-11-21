class QuizAnswersController < ApplicationController
  before_action :set_quiz_node, only: %i[ new create ]
  before_action :set_quiz_answer, only: %i[ show edit update destroy ]

  # GET /quiz_answers or /quiz_answers.json
  def index
    @quiz_answers = QuizAnswer.all
  end

  # GET /quiz_answers/1 or /quiz_answers/1.json
  def show
  end

  # GET /quiz_answers/new
  def new
    @quiz_answer = @quiz_node.quiz_answers.new
  end

  # GET /quiz_answers/1/edit
  def edit
  end

  # POST /quiz_answers or /quiz_answers.json
  def create
    @quiz_answer = @quiz_node.quiz_answers.new(quiz_answer_params)

    respond_to do |format|
      if @quiz_answer.save
        format.html { redirect_to new_quiz_node_quiz_answer_url(@quiz_node), notice: "Quiz answer was successfully created." }
        format.json { render :show, status: :created, location: @quiz_answer }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @quiz_answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /quiz_answers/1 or /quiz_answers/1.json
  def update
    respond_to do |format|
      if @quiz_answer.update(quiz_answer_params)
        format.html { redirect_to quiz_answer_url(@quiz_answer), notice: "Quiz answer was successfully updated." }
        format.json { render :show, status: :ok, location: @quiz_answer }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @quiz_answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /quiz_answers/1 or /quiz_answers/1.json
  def destroy
    @quiz_answer.destroy

    respond_to do |format|
      format.html { redirect_to quiz_answers_url, notice: "Quiz answer was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_quiz_node
      @quiz_node = QuizNode.find(params[:quiz_node_id])
    end
    
    def set_quiz_answer
      @quiz_answer = QuizAnswer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def quiz_answer_params
      params.require(:quiz_answer).permit(:text, :explanation, :points)
    end
end
