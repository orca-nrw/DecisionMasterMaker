require "application_system_test_case"

class QuizNodesTest < ApplicationSystemTestCase
  setup do
    @quiz_node = quiz_nodes(:one)
  end

  test "visiting the index" do
    visit quiz_nodes_url
    assert_selector "h1", text: "Quiz nodes"
  end

  test "should create quiz node" do
    visit quiz_nodes_url
    click_on "New quiz node"

    click_on "Create Quiz node"

    assert_text "Quiz node was successfully created"
    click_on "Back"
  end

  test "should update Quiz node" do
    visit quiz_node_url(@quiz_node)
    click_on "Edit this quiz node", match: :first

    click_on "Update Quiz node"

    assert_text "Quiz node was successfully updated"
    click_on "Back"
  end

  test "should destroy Quiz node" do
    visit quiz_node_url(@quiz_node)
    click_on "Destroy this quiz node", match: :first

    assert_text "Quiz node was successfully destroyed"
  end
end
