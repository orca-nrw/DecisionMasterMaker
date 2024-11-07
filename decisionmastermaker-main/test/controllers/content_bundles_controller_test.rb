require "test_helper"

class ContentBundlesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @content_bundle = content_bundles(:one)
  end

  test "should get index" do
    get content_bundles_url
    assert_response :success
  end

  test "should get new" do
    get new_content_bundle_url
    assert_response :success
  end

  test "should create content_bundle" do
    assert_difference("ContentBundle.count") do
      post content_bundles_url, params: { content_bundle: { contact: @content_bundle.contact, title: @content_bundle.title } }
    end

    assert_redirected_to content_bundle_url(ContentBundle.last)
  end

  test "should show content_bundle" do
    get content_bundle_url(@content_bundle)
    assert_response :success
  end

  test "should get edit" do
    get edit_content_bundle_url(@content_bundle)
    assert_response :success
  end

  test "should update content_bundle" do
    patch content_bundle_url(@content_bundle), params: { content_bundle: { contact: @content_bundle.contact, title: @content_bundle.title } }
    assert_redirected_to content_bundle_url(@content_bundle)
  end

  test "should destroy content_bundle" do
    assert_difference("ContentBundle.count", -1) do
      delete content_bundle_url(@content_bundle)
    end

    assert_redirected_to content_bundles_url
  end
end
