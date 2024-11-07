require "application_system_test_case"

class FuseNodesTest < ApplicationSystemTestCase
  setup do
    @fuse_node = fuse_nodes(:one)
  end

  test "visiting the index" do
    visit fuse_nodes_url
    assert_selector "h1", text: "Fuse nodes"
  end

  test "should create fuse node" do
    visit fuse_nodes_url
    click_on "New fuse node"

    click_on "Create Fuse node"

    assert_text "Fuse node was successfully created"
    click_on "Back"
  end

  test "should update Fuse node" do
    visit fuse_node_url(@fuse_node)
    click_on "Edit this fuse node", match: :first

    click_on "Update Fuse node"

    assert_text "Fuse node was successfully updated"
    click_on "Back"
  end

  test "should destroy Fuse node" do
    visit fuse_node_url(@fuse_node)
    click_on "Destroy this fuse node", match: :first

    assert_text "Fuse node was successfully destroyed"
  end
end
