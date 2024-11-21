require "application_system_test_case"

class BodyExaminationsTest < ApplicationSystemTestCase
  setup do
    @body_examination = body_examinations(:one)
  end

  test "visiting the index" do
    visit body_examinations_url
    assert_selector "h1", text: "Body examinations"
  end

  test "should create body examination" do
    visit body_examinations_url
    click_on "New body examination"

    click_on "Create Body examination"

    assert_text "Body examination was successfully created"
    click_on "Back"
  end

  test "should update Body examination" do
    visit body_examination_url(@body_examination)
    click_on "Edit this body examination", match: :first

    click_on "Update Body examination"

    assert_text "Body examination was successfully updated"
    click_on "Back"
  end

  test "should destroy Body examination" do
    visit body_examination_url(@body_examination)
    click_on "Destroy this body examination", match: :first

    assert_text "Body examination was successfully destroyed"
  end
end
