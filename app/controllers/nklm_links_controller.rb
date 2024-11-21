class NklmLinksController < ApplicationController
  before_action :set_nklm_link, only: %i[ show edit update destroy ]

  def index
    @nklm_links = NklmLink.all
  end

  def show
  end

  def new
    @step = Step.find(params[:step_id])
    @nklm_link = @step.nklm_links.new
  end

  def edit
  end

  def create
    @step = Step.find(params[:step_id])
    @nklm_link = @step.nklm_links.new(nklm_link_params)

    respond_to do |format|
      if @nklm_link.save
        format.html { redirect_to nklm_link_url(@nklm_link), notice: "Nklm link was successfully created." }
        format.json { render :show, status: :created, location: @nklm_link }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @nklm_link.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @nklm_link.update(nklm_link_params)
        format.html { redirect_to nklm_link_url(@nklm_link), notice: "Nklm link was successfully updated." }
        format.json { render :show, status: :ok, location: @nklm_link }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @nklm_link.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @nklm_link.destroy

    respond_to do |format|
      format.html { redirect_to nklm_links_url, notice: "Nklm link was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_nklm_link
      @nklm_link = NklmLink.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def nklm_link_params
      params.require(:nklm_link).permit(
        :title, :nklm_url
      )
    end
end
