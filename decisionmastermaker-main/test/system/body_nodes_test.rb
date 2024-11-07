require "application_system_test_case"

class BodyNodesTest < ApplicationSystemTestCase
  setup do
    @body_node = body_nodes(:one)
  end

  test "visiting the index" do
    visit body_nodes_url
    assert_selector "h1", text: "Body nodes"
  end

  test "should create body node" do
    visit body_nodes_url
    click_on "New body node"

    click_on "Create Body node"

    assert_text "Body node was successfully created"
    click_on "Back"
  end

  test "should update Body node" do
    visit body_node_url(@body_node)
    click_on "Edit this body node", match: :first

    click_on "Update Body node"

    assert_text "Body node was successfully updated"
    click_on "Back"
  end

  test "should destroy Body node" do
    visit body_node_url(@body_node)
    click_on "Destroy this body node", match: :first

    assert_text "Body node was successfully destroyed"
  end
end
