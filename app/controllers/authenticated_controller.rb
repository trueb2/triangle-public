class AuthenticatedController < ApplicationController
  acts_as_token_authentication_handler_for User, fallback: :exception
  before_action :ensure_admin!, except: [:index, :show]

  private
  def ensure_admin!
    unless !current_user.nil? && current_user.role == Role.find_by_name('admin')
      render status: :forbidden
    end
  end
end
