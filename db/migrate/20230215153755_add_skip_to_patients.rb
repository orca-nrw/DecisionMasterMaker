class AddSkipToPatients < ActiveRecord::Migration[7.0]
  def change
    add_column :patients, :skip, :boolean, default: false
  end
end
