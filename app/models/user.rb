class User < ApplicationRecord
  acts_as_token_authenticatable
  before_create :set_default_role
  # after_create :send_admin_mail


  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :brother
  belongs_to :role

  def active_for_authentication?
    super && approved?
  end

  def inactive_message
    if !approved?
      :not_approved
    else
      super # Use whatever other message
    end
  end

  def role_name
    self.role.name unless self.role.nil?
  end

  private
  def set_default_role
    self.role ||= Role.find_by_name('registered')
  end

  # def send_admin_mail
  #   AdminMailer.new_user_waiting_for_approval(self).deliver
  # end
end
