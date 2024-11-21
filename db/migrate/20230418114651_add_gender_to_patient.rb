class AddGenderToPatient < ActiveRecord::Migration[7.0]
  def change
    add_column :patients, :gender, :integer, default: 0
  end
end
