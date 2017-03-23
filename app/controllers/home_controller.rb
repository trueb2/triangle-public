class HomeController < ApplicationController
  def index
    @semester = Semester.last
    @events = @semester.events
    @jobs = Job.where "execb > 0 AND semester_id = #{@semester.id}"
    @brothers = @jobs.map { |j| j.brother }
    @images = @events.map { |e| e.image } | @brothers.map { |b| b.image }
    render json: {
      semester: ActiveModelSerializers::SerializableResource.new(@semester).as_json,
      events: ActiveModelSerializers::SerializableResource.new(@events).as_json,
      images: ActiveModelSerializers::SerializableResource.new(@images.compact).as_json,
      jobs: ActiveModelSerializers::SerializableResource.new(@jobs).as_json,
      brothers: ActiveModelSerializers::SerializableResource.new(@brothers, each_serializer: CensoredBrotherSerializer).as_json
    }
  end
end
