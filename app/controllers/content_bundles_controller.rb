class ContentBundlesController < ApplicationController
  skip_before_action :check_for_lockup, raise: false, only: %i[show]
  before_action :set_content_bundle, only: %i[ show edit update destroy ]

  # GET /content_bundles or /content_bundles.json
  def index
    @content_bundles = ContentBundle.all
  end

  # GET /content_bundles/1 or /content_bundles/1.json
  def show
    render layout: "game"
  end

  # GET /content_bundles/new
  def new
    @content_bundle = ContentBundle.new
  end

  # GET /content_bundles/1/edit
  def edit
  end

  # POST /content_bundles or /content_bundles.json
  def create
    @content_bundle = ContentBundle.new(content_bundle_params)

    respond_to do |format|
      if @content_bundle.save
        format.html { redirect_to edit_content_bundle_url(@content_bundle), notice: "Content bundle was successfully created." }
        format.json { render :show, status: :created, location: @content_bundle }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @content_bundle.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /content_bundles/1 or /content_bundles/1.json
  def update
    respond_to do |format|
      if @content_bundle.update(content_bundle_params)
        format.html { redirect_to edit_content_bundle_url(@content_bundle), notice: "Content bundle was successfully updated." }
        format.json { render :show, status: :ok, location: @content_bundle }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @content_bundle.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /content_bundles/1 or /content_bundles/1.json
  def destroy
    @content_bundle.destroy

    respond_to do |format|
      format.html { redirect_to content_bundles_url, notice: "Content bundle was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_content_bundle
      @content_bundle = ContentBundle.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def content_bundle_params
      params.require(:content_bundle).permit(:title, :contact, :tutorial_id, patient_ids: [])
    end
end
