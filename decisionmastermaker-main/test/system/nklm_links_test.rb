require "application_system_test_case"

class NklmLinksTest < ApplicationSystemTestCase
  setup do
    @nklm_link = nklm_links(:one)
  end

  test "visiting the index" do
    visit nklm_links_url
    assert_selector "h1", text: "Nklm links"
  end

  test "should create nklm link" do
    visit nklm_links_url
    click_on "New nklm link"

    click_on "Create Nklm link"

    assert_text "Nklm link was successfully created"
    click_on "Back"
  end

  test "should update Nklm link" do
    visit nklm_link_url(@nklm_link)
    click_on "Edit this nklm link", match: :first

    click_on "Update Nklm link"

    assert_text "Nklm link was successfully updated"
    click_on "Back"
  end

  test "should destroy Nklm link" do
    visit nklm_link_url(@nklm_link)
    click_on "Destroy this nklm link", match: :first

    assert_text "Nklm link was successfully destroyed"
  end
end
