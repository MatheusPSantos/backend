defmodule Backend.CategoriesTest do
  use Backend.DataCase
  alias Backend.Categories
  alias Backend.Categories.Category

  test "given a call to list categories return all" do
    assert Categories.all() == []
  end

  test "given informations about categories should create one" do
    payload = %{name: "Sport", description: "Some description"}

    assert {:ok, %Category{} = category} = Categories.create(payload)
    assert category.name == payload.name
    assert category.description == payload.description
  end
end
