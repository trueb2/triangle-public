class ImagesController < AuthenticatedController
  before_action :set_image, only: [:show, :update, :destroy]

  # GET /images
  def index
    if params[:unused].nil?
      @images = Image.all
    else
      @images = Image.where 'brother_id is null and event_id is null'
    end

    render json: @images
  end

  # GET /images/1
  def show
    render json: @image
  end

  # POST /images
  def create
    @image = Image.new(picture: params[:file], image_purpose: params[:image_purpose])

    if @image.save
      render json: @image, status: :created, location: @image.picture.path
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /images/1
  def update
    if @image.update(image_params)
      render json: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # DELETE /images/1
  def destroy
    @image.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def image_params
      params.fetch(:file, :image_purpose)
    end
end
