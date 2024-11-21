require "application_system_test_case"

class ContentBundlesTest < ApplicationSystemTestCase
  setup do
    @content_bundle = content_bundles(:one)
  end

  test "visiting the index" do
    visit content_bundles_url
    assert_selector "h1", text: "Content bundles"
  end

  test "should create content bundle" do
    visit content_bundles_url
    click_on "New content bundle"

    fill_in "Contact", with: @content_bundle.contact
    fill_in "Title", with: @content_bundle.title
    click_on "Create Content bundle"

    assert_text "Content bundle was successfully created"
    click_on "Back"
  end

  test "should update Content bundle" do
    visit content_bundle_url(@content_bundle)
    click_on "Edit this content bundle", match: :first

    fill_in "Contact", with: @content_bundle.contact
    fill_in "Title", with: @content_bundle.title
    click_on "Update Content bundle"

    assert_text "Content bundle was successfully updated"
    click_on "Back"
  end

  test "should destroy Content bundle" do
    visit content_bundle_url(@content_bundle)
    click_on "Destroy this content bundle", match: :first

    assert_text "Content bundle was successfully destroyed"
  end
end
