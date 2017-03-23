class Image < ApplicationRecord
  belongs_to :event, optional: true
  belongs_to :brother, optional: true
  has_attached_file :picture, styles: { bro: "500x500>", event: "700x700>" }, default_url: '/default.jpg'
  validates_attachment :picture,
                       content_type: { content_type: ['image/jpeg', 'image/png'] },
                       size: { less_than: 15.megabytes },
                       file_name: { matches: [/png\Z/, /jpe?g\Z/i] }
  do_not_validate_attachment_file_type :picture

  def path
    if image_purpose == 1
      picture.url :bro
    else
      picture.url :event
    end
  end
end
