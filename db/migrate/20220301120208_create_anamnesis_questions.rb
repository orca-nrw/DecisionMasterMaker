class CreateAnamnesisQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :anamnesis_questions do |t|
      t.string :question
      t.text :answer
      t.text :reasoning
      t.string :tags
      t.references :fuse_node, null: false, foreign_key: true

      t.timestamps
    end
  end
end
