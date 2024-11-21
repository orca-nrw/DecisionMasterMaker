require "application_system_test_case"

class QuizAnswersTest < ApplicationSystemTestCase
  setup do
    @quiz_answer = quiz_answers(:one)
  end

  test "visiting the index" do
    visit quiz_answers_url
    assert_selector "h1", text: "Quiz answers"
  end

  test "should create quiz answer" do
    visit quiz_answers_url
    click_on "New quiz answer"

    click_on "Create Quiz answer"

    assert_text "Quiz answer was successfully created"
    click_on "Back"
  end

  test "should update Quiz answer" do
    visit quiz_answer_url(@quiz_answer)
    click_on "Edit this quiz answer", match: :first

    click_on "Update Quiz answer"

    assert_text "Quiz answer was successfully updated"
    click_on "Back"
  end

  test "should destroy Quiz answer" do
    visit quiz_answer_url(@quiz_answer)
    click_on "Destroy this quiz answer", match: :first

    assert_text "Quiz answer was successfully destroyed"
  end
end
