require "application_system_test_case"

class AnamnesisQuestionsTest < ApplicationSystemTestCase
  setup do
    @anamnesis_question = anamnesis_questions(:one)
  end

  test "visiting the index" do
    visit anamnesis_questions_url
    assert_selector "h1", text: "Anamnesis questions"
  end

  test "should create anamnesis question" do
    visit anamnesis_questions_url
    click_on "New anamnesis question"

    click_on "Create Anamnesis question"

    assert_text "Anamnesis question was successfully created"
    click_on "Back"
  end

  test "should update Anamnesis question" do
    visit anamnesis_question_url(@anamnesis_question)
    click_on "Edit this anamnesis question", match: :first

    click_on "Update Anamnesis question"

    assert_text "Anamnesis question was successfully updated"
    click_on "Back"
  end

  test "should destroy Anamnesis question" do
    visit anamnesis_question_url(@anamnesis_question)
    click_on "Destroy this anamnesis question", match: :first

    assert_text "Anamnesis question was successfully destroyed"
  end
end
