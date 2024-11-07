class AttachmentsController < ApplicationController
  before_action :set_attachment, only: %i[ show edit update destroy ]

  # GET /attachments or /attachments.json
  def index
    @attachments = Attachment.all
    @breadcrumbs = [{ text: I18n.t('attachments'), url: attachments_path }]
  end

  # GET /attachments/1 or /attachments/1.json
  def show
    @breadcrumbs = [
      { text: I18n.t('attachments'), url: attachments_path },
      { text: @attachment.title, url: @attachment }
    ]
  end

  # GET /attachments/new
  def new
    @attachment = Attachment.new
    @attachment.attachable_id = params['attachable_id']
    @attachment.attachable_type = params['attachable_type']
    @breadcrumbs = [
      { text: I18n.t('attachments'), url: attachments_path },
      { text: I18n.t('attachmentNew'), url: new_attachment_path }
    ]
  end

  # GET /attachments/1/edit
  def edit
    @breadcrumbs = [
      { text: I18n.t('attachments'), url: attachments_path },
      { text: I18n.t('attachmentEdit', attachment_name: @attachment.title), url: edit_attachment_path(@attachment) }
    ]
  end

  # POST /attachments or /attachments.json
  def create
    @attachment = Attachment.new(attachment_params)

    respond_to do |format|
      if @attachment.save
        format.html { redirect_to attachment_url(@attachment), notice: "Attachment was successfully created." }
        format.json { render :show, status: :created, location: @attachment }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @attachment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /attachments/1 or /attachments/1.json
  def update
    respond_to do |format|
      if @attachment.update(params[:attachment][:files] == [''] ? attachment_params_without_files : attachment_params)
        format.html { redirect_to attachment_url(@attachment), notice: "Attachment was successfully updated." }
        format.json { render :show, status: :ok, location: @attachment }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @attachment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /attachments/1 or /attachments/1.json
  def destroy
    @attachment.destroy

    respond_to do |format|
      format.html { redirect_to attachments_url, notice: "Attachment was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def purge_attachment

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_attachment
      @attachment = Attachment.find(params[:id])
      @attachment.files.reload
    end

    # Only allow a list of trusted parameters through.
    def attachment_params
      params.require(:attachment).permit(:attachable_id, :attachable_type, :title, :content, files: [])
    end

    def attachment_params_without_files
      params.require(:attachment).permit(:attachable_id, :attachable_type, :title, :content)
    end
end
