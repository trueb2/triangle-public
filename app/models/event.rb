class Event < ApplicationRecord
  has_one :image
  has_and_belongs_to_many :semesters

  def rush?
    event_type == 0
  end

  def service?
    event_type == 1
  end

  def professional?
    event_type == 2
  end
end
