class EventsController < AuthenticatedController
  before_action :set_event, only: [:show, :update, :destroy]

  # GET /events
  def index
    @events = Event.all
    render json: @events
  end

  # GET /events/1
  def show
    render json: @event
  end

  # POST /events
  def create
    @event = Event.new(event_params)

    @event.semesters << Semester.last

    if @event.save
      set_image
      render json: @event, status: :created, location: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /events/1
  def update
    if @event.update(event_params)
      set_image
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /events/1
  def destroy
    @event.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    def set_image
      unless @image.nil?
        @image.event = @event
        @image.save
      end
    end

    # Only allow a trusted parameter "white list" through.
    def event_params
      eps = ActiveModelSerializers::Deserialization.jsonapi_parse(params)
      unless eps[:image_id].nil?
        @image = Image.find eps[:image_id]
      end
      eps.delete :image_id
      eps
    end
end
