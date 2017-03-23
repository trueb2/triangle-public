class AddImageReferencesEvent < ActiveRecord::Migration[5.0]
  def change
    add_reference :images, :event, foreign_key: true
  end
end
