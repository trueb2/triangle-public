if Rails.env.production?
  Paperclip::Attachment.default_options[:s3_host_name] = 's3.us-east-2.amazonaws.com'
end
