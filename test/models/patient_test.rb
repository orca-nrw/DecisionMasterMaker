require "test_helper"

class PatientTest < ActiveSupport::TestCase
  test "valid patient" do
    patient = Patient.new(title: 'Foobar')
    assert patient.valid?
  end
  test "incomplete attributes" do
    patient = Patient.new
    assert patient.invalid?
  end
  test "patients have steps" do
    assert_not_empty patients(:alice).steps
  end
  test "steps should be retrieved in ascending order" do
    positions = patients(:alice).steps.map { |s| s.position }
    assert positions == positions.sort
  end
  test "steps can be reordered" do
    step_to_be_moved = patients(:alice).steps.first
    step_to_be_moved.move_to_bottom
    assert step_to_be_moved.last?
  end
end
