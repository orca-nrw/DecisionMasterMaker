require "application_system_test_case"

class SelfEvaluationNodesTest < ApplicationSystemTestCase
  setup do
    @self_evaluation_node = self_evaluation_nodes(:one)
  end

  test "visiting the index" do
    visit self_evaluation_nodes_url
    assert_selector "h1", text: "Self evaluation nodes"
  end

  test "should create self evaluation node" do
    visit self_evaluation_nodes_url
    click_on "New self evaluation node"

    fill_in "Score", with: @self_evaluation_node.score
    fill_in "Step", with: @self_evaluation_node.step_id
    click_on "Create Self evaluation node"

    assert_text "Self evaluation node was successfully created"
    click_on "Back"
  end

  test "should update Self evaluation node" do
    visit self_evaluation_node_url(@self_evaluation_node)
    click_on "Edit this self evaluation node", match: :first

    fill_in "Score", with: @self_evaluation_node.score
    fill_in "Step", with: @self_evaluation_node.step_id
    click_on "Update Self evaluation node"

    assert_text "Self evaluation node was successfully updated"
    click_on "Back"
  end

  test "should destroy Self evaluation node" do
    visit self_evaluation_node_url(@self_evaluation_node)
    click_on "Destroy this self evaluation node", match: :first

    assert_text "Self evaluation node was successfully destroyed"
  end
end
