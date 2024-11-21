class PatientsController < ApplicationController
  before_action :set_patient, only: %i[ show edit update destroy preview ]

  # GET /patients or /patients.json
  def index
    @patients = Patient.all
    @breadcrumbs = [{ text: 'Patient*innen', url: patients_path }]
  end

  # GET /patients/1 or /patients/1.json
  def show
    @breadcrumbs = [
      { text: 'Patient*innen', url: patients_path },
      { text: @patient.title, url: @patient }
    ]
  end

  # GET /patients/new
  def new
    @patient = Patient.new
    @breadcrumbs = [
      { text: 'Patient*innen', url: patients_path },
      { text: 'Neue Patient*in anlegen', url: new_patient_path }
    ]
  end

  # GET /patients/1/edit
  def edit
    @breadcrumbs = [
      { text: 'Patient*innen', url: patients_path },
      { text: "#{@patient.title} editieren", url: edit_patient_path(@patient) }
    ]
  end

  # POST /patients or /patients.json
  def create
    @patient = Patient.new(patient_params)

    respond_to do |format|
      if @patient.save
        format.html { redirect_to edit_patient_url(@patient), notice: "Patient was successfully created." }
        format.json { render :show, status: :created, location: @patient }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @patient.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /patients/1 or /patients/1.json
  def update
    add_step(params[:nodeType]) && return if params[:commit] == 'add-step'

    respond_to do |format|
      if @patient.update(patient_params)
        flash.now[:notice] = "Patient was updated!"
        format.turbo_stream { render turbo_stream: turbo_stream.replace("flash", partial: "layouts/flash", locals: { flash: flash }) }
        format.html { redirect_to edit_patient_url(@patient) }
        format.json { render :show, status: :ok, location: @patient }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @patient.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /patients/1 or /patients/1.json
  def destroy
    @patient.destroy

    respond_to do |format|
      format.html { redirect_to patients_url, notice: "Patient was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def preview
    render layout: "game"
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_patient
    @patient = Patient.find(params[:id])
    @patient.steps.reload
    @patient.attachments.reload
  end

  def add_step(node_type)
    return unless Step.node_types.include? node_type

    sstep = @patient.steps.build
    sstep.save!
    interactable = node_type.constantize.new
    interactable.step_id = sstep.id
    interactable.save!
    sstep.update(interactable_id: interactable.id, interactable_type: node_type)
  end

  # Only allow a list of trusted parameters through.
  def patient_params
    params.require(:patient).permit(:status, :title, :skip, :gender, attachment:
      [
        :title, :content, { files: [] }
      ])
  end
end
