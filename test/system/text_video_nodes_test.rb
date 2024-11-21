require "application_system_test_case"

class TextVideoNodesTest < ApplicationSystemTestCase
  setup do
    @text_video_node = text_video_nodes(:one)
  end

  test "visiting the index" do
    visit text_video_nodes_url
    assert_selector "h1", text: "Text video nodes"
  end

  test "should create text video node" do
    visit text_video_nodes_url
    click_on "New text video node"

    click_on "Create Text video node"

    assert_text "Text video node was successfully created"
    click_on "Back"
  end

  test "should update Text video node" do
    visit text_video_node_url(@text_video_node)
    click_on "Edit this text video node", match: :first

    click_on "Update Text video node"

    assert_text "Text video node was successfully updated"
    click_on "Back"
  end

  test "should destroy Text video node" do
    visit text_video_node_url(@text_video_node)
    click_on "Destroy this text video node", match: :first

    assert_text "Text video node was successfully destroyed"
  end
end
