class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :short
      t.string :long
      t.integer :event_type

      t.timestamps
    end
  end
end
