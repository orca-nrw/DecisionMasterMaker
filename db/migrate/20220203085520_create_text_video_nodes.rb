class CreateTextVideoNodes < ActiveRecord::Migration[7.0]
  def change
    create_table :text_video_nodes do |t|
      t.references :step, null: false, foreign_key: true
      t.string :video

      t.timestamps
    end
  end
end
