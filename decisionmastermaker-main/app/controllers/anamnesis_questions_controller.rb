class AnamnesisQuestionsController < ApplicationController
  before_action :set_fuse_node, only: %i[ new create ]
  before_action :set_anamnesis_question, only: %i[ show edit update destroy ]

  # GET /anamnesis_questions or /anamnesis_questions.json
  def index
    @anamnesis_questions = AnamnesisQuestion.all
  end

  # GET /anamnesis_questions/1 or /anamnesis_questions/1.json
  def show
  end

  # GET /anamnesis_questions/new
  def new
    @anamnesis_question = @fuse_node.anamnesis_questions.new
  end

  # GET /anamnesis_questions/1/edit
  def edit
  end

  # POST /anamnesis_questions or /anamnesis_questions.json
  def create
    @anamnesis_question = @fuse_node.anamnesis_questions.create(anamnesis_question_params)

    respond_to do |format|
      if @anamnesis_question.save
        format.html { redirect_to new_fuse_node_anamnesis_question_url(@fuse_node), notice: "Anamnesis question was successfully created." }
        format.json { render :show, status: :created, location: @anamnesis_question }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @anamnesis_question.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /anamnesis_questions/1 or /anamnesis_questions/1.json
  def update
    respond_to do |format|
      if @anamnesis_question.update(anamnesis_question_params)
        format.html { redirect_to anamnesis_question_url(@anamnesis_question), notice: "Anamnesis question was successfully updated." }
        format.json { render :show, status: :ok, location: @anamnesis_question }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @anamnesis_question.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /anamnesis_questions/1 or /anamnesis_questions/1.json
  def destroy
    @anamnesis_question.destroy

    respond_to do |format|
      format.html { redirect_to anamnesis_questions_url, notice: "Anamnesis question was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_fuse_node
      @fuse_node = FuseNode.find(params[:fuse_node_id])
    end
    
    def set_anamnesis_question
      @anamnesis_question = AnamnesisQuestion.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def anamnesis_question_params
      params.require(:anamnesis_question).permit(:question, :answer, :reasoning, :tags, :points)
    end
end
