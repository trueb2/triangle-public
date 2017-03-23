class EventSerializer < ActiveModel::Serializer
  attributes :id, :start, :short, :long, :event_type
  has_many :semesters
end
