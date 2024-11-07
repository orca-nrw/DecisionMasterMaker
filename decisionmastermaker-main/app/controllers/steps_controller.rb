class StepsController < ApplicationController
  before_action :set_step, only: %i[ show edit update destroy lower higher]

  # GET /steps/1 or /steps/1.json
  def show
  end

  # GET /steps/1/edit
  def edit
    @breadcrumbs = [
      { text: 'Patient*innen', url: patients_path },
      { text: @step.patient.title, url: edit_patient_path(@step.patient) },
      { text: @step.problem, url: edit_step_path(@step) }
    ]
  end

  # POST /steps or /steps.json
  def create
    @step = Step.new(step_params)

    respond_to do |format|
      if @step.save
        format.html { redirect_to step_url(@step), notice: "Step was successfully created." }
        format.json { render :show, status: :created, location: @step }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @step.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /steps/1 or /steps/1.json
  def update
    add_anamnesis_question(params[:anamnesis_question]) && return if params[:commit] == 'add-anamnesis-question'
    add_quiz_answer(params[:quiz_answer]) && return if params[:commit] == 'add-quiz-answer'
    add_body_examination(params[:body_examination]) && return if params[:commit] == 'add-body-examination'

    respond_to do |format|
      if @step.update(step_params)
        format.html { redirect_to edit_step_url(@step), notice: "Step was successfully updated." }
        format.json { render :show, status: :ok, location: @step }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @step.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /steps/1 or /steps/1.json
  def destroy
    patient = @step.patient
    @step.destroy
  end
  
  def lower
    @step.move_lower
    redirect_to edit_patient_path(@step.patient)
  end
  
  def higher
    @step.move_higher
    redirect_to edit_patient_path(@step.patient)
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_step
    @step = Step.find(params[:id])
    @step.interactable.reload
    @step.nklm_links.reload
  end

  # Only allow a list of trusted parameters through.
  def step_params
    params.require(:step).permit(
      :status,
      :casefile,
      :position,
      :problem,
      :objective,
      :setting,
      :actors,
      :nklm,
      :patient_id,
      :interactable_type,
      :interactable_id,
      interactable_attributes: [
        :question,
        :multiple_choice,
        :id,
        :tries      ]
    )
  end
end
