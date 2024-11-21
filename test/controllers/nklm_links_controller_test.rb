require "test_helper"

class NklmLinksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @nklm_link = nklm_links(:one)
  end

  test "should get index" do
    get nklm_links_url
    assert_response :success
  end

  test "should get new" do
    get new_nklm_link_url
    assert_response :success
  end

  test "should create nklm_link" do
    assert_difference("NklmLink.count") do
      post nklm_links_url, params: { nklm_link: {  } }
    end

    assert_redirected_to nklm_link_url(NklmLink.last)
  end

  test "should show nklm_link" do
    get nklm_link_url(@nklm_link)
    assert_response :success
  end

  test "should get edit" do
    get edit_nklm_link_url(@nklm_link)
    assert_response :success
  end

  test "should update nklm_link" do
    patch nklm_link_url(@nklm_link), params: { nklm_link: {  } }
    assert_redirected_to nklm_link_url(@nklm_link)
  end

  test "should destroy nklm_link" do
    assert_difference("NklmLink.count", -1) do
      delete nklm_link_url(@nklm_link)
    end

    assert_redirected_to nklm_links_url
  end
end
