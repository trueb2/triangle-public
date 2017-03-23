class AddDateToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :start, :datetime
  end
end
