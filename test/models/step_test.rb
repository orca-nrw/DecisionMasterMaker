require "test_helper"

class StepTest < ActiveSupport::TestCase
  test 'steps do not save without attached patient' do
    assert Step.new.invalid?
  end
  test "steps can reference their patient" do
    assert_not_nil steps(:one).patient
  end
  test "steps know their own step number" do
    assert_not_nil steps(:one).position
  end
  test "steps can retrieve their interactable type" do
    assert_not_nil steps(:one).interactable_type
  end
end
