class BodyExaminationsController < ApplicationController
  before_action :set_body_node, only: %i[ index new create ]
  before_action :set_body_examination, only: %i[ show edit update destroy ]

  # GET /body_examinations or /body_examinations.json
  def index
    @body_examinations = @body_node.body_examinations
  end

  # GET /body_examinations/1 or /body_examinations/1.json
  def show
  end

  # GET /body_examinations/new
  def new
    @body_examination = @body_node.body_examinations.new
  end

  # GET /body_examinations/1/edit
  def edit
  end

  # POST /body_examinations or /body_examinations.json
  def create
    @body_examination = @body_node.body_examinations.new(body_examination_params)

    respond_to do |format|
      if @body_examination.save
        format.html { redirect_to new_body_node_body_examination_url(@body_node), notice: "Body examination was successfully created." }
        format.json { render :show, status: :created, location: @body_examination }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @body_examination.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /body_examinations/1 or /body_examinations/1.json
  def update
    respond_to do |format|
      if @body_examination.update(body_examination_params)
        format.html { redirect_to body_examination_url(@body_examination), notice: "Body examination was successfully updated." }
        format.json { render :show, status: :ok, location: @body_examination }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @body_examination.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /body_examinations/1 or /body_examinations/1.json
  def destroy
    @body_examination.destroy

    respond_to do |format|
      format.html { redirect_to body_examinations_url, notice: "Body examination was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_body_node
      @body_node = BodyNode.find(params[:body_node_id])
    end
    
    def set_body_examination
      @body_examination = BodyExamination.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def body_examination_params
      params.require(:body_examination).permit(:location, :location_details,
        :examination_type, :examination_type_details, :points, :results,
        :results_comment, :examination_type_comment)
    end
end
