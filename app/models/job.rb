class Job < ApplicationRecord
  belongs_to :brother, optional: true
  belongs_to :semester

  after_initialize :init

  def init
    self.email ||= ''
    self.execb ||= 0
  end
end
