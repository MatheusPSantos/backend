defmodule Backend.Categories do
  alias Backend.Categories.Category
  alias Backend.Repo

  def all do
    Repo.all(Category)
  end
end
