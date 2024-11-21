class AddQuestionToFuseNodes < ActiveRecord::Migration[7.0]
  def change
    add_column :fuse_nodes, :question, :string
  end
end
