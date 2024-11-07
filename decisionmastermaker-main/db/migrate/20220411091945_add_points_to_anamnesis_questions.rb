class AddPointsToAnamnesisQuestions < ActiveRecord::Migration[7.0]
  def change
    add_column :anamnesis_questions, :points, :integer, default: 0
  end
end
