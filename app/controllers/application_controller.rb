class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  respond_to :json
  before_action :reset_session
end
