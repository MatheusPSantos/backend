defmodule BackendWeb.CategoryView do
  use BackendWeb, :view

  def render("index.json", %{categories: categories}) do
    render_many(categories, __MODULE__, "category.json")
  end

  def render("category.json", %{category: category}) do
    %{
      id: 123,
      name: "some_name_1",
      description: "some_description_1"
    }
  end
end
