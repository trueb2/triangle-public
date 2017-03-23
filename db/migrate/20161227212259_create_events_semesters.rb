class CreateEventsSemesters < ActiveRecord::Migration[5.0]
  def change
    create_table :events_semesters do |t|
      t.references :event, foreign_key: true
      t.references :semester, foreign_key: true
    end
  end
end
