defmodule Backend.Categories do
  alias Backend.Categories.Category

  def all do
    [
      %{
        id: 123,
        name: "some_name_1",
        description: "some_description_1"
      },
      %{
        id: 1234,
        name: "some_name_2",
        description: "some_description_2"
      }
    ]
  end
end
