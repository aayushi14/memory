defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel

  alias Memory.Game

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      newState = if(Memory.GameBackup.load(name)) do
        Memory.GameBackup.load(name)
        else
        game = Game.client_view(Game.new())
      end
      socket = socket
      |> assign(:game, newState)
      |> assign(:name, name)
        {:ok, %{"join" => name, "game" => newState}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("doReset", %{}, socket) do
    game = Game.doReset(socket.assigns[:game])
    socket = assign(socket, :game, game)
    Memory.GameBackup.save(socket.assigns[:name], game)
    {:reply, {:ok, %{"game" => game}}, socket}
  end

  def handle_in("loadNew", %{}, socket) do
    game = Game.loadNew(socket.assigns[:game])
    Memory.GameBackup.save(socket.assigns[:name], game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => game}}, socket}
  end

  def handle_in("showTile", %{"opentile" => id}, socket) do
    game = Game.showTile(socket.assigns[:game], id)
    Memory.GameBackup.save(socket.assigns[:name], game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => game}}, socket}
  end

  def handle_in("diffTiles", %{"queArray" => queArray, "opentile1" => opentile1, "opentile2" => opentile2, "disableClick" => boole}, socket) do
    game = Game.diffTiles(socket.assigns[:game], queArray, opentile1, opentile2, boole)
    Memory.GameBackup.save(socket.assigns[:name], game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => game}}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
