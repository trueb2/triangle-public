class SemestersController < AuthenticatedController
  before_action :set_semester, only: [:show, :update, :destroy]

  # GET /semesters
  def index
    if params[:offset].nil?
      @semesters = Semester.all
    else
      @semesters = Semester.offset(params[:offset].to_i).last
    end

    render json: @semesters
  end

  # GET /semesters/1
  def show
    render json: @semester
  end

  # POST /semesters
  def create
    @semester = Semester.new(semester_params)

    if @semester.save
      render json: @semester, status: :created, location: @semester
    else
      render json: @semester.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /semesters/1
  def update
    if @semester.update(semester_params)
      render json: @semester
    else
      render json: @semester.errors, status: :unprocessable_entity
    end
  end

  # DELETE /semesters/1
  def destroy
    @semester.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_semester
      @semester = Semester.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def semester_params
      params.fetch(:semester, {})
    end
end
