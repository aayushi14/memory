defmodule Memory.Game do
  def new do
    %{
      queArray: [],
      loadedArray: shuffleArray(),
      totalClicks: 0,
      disableClick: false
    }
  end

  def client_view(game) do
    %{
      queArray: ["?","?","?","?","?","?","?","?","?","?","?","?","?","?","?","?"],
      totalClicks: 0,
      opentile1: 16,
      opentile2: 16,
      matchedIndex: [],
      score: 0,
      disableClick: false,
      loadedArray: shuffleArray()
    }
  end

  def shuffleArray() do
    arr = ["A","B","C","D","E","F","G","H","A","B","C","D","E","F","G","H"]
    Enum.shuffle(arr)
  end

  def doReset(game) do
    queArray = game.queArray
    matchedIndex = game.matchedIndex
    score = game.score
    queArray = ["?","?","?","?","?","?","?","?","?","?","?","?","?","?","?","?"]
  %{game | queArray: queArray, opentile1: 16, opentile2: 16, matchedIndex: [], totalClicks: 0, score: 0}
  end

  def loadNew(game) do
    loadedArray = game.loadedArray
    loadedArray = shuffleArray()
  end

  def showTile(game, id) do
    queArray = game.queArray
    opentile1 = game.opentile1
    opentile2 = game.opentile2
    ansArray = game.loadedArray
    matchedIndex = game.matchedIndex;
    score = game.score
    totalClicks = game.totalClicks
    disableClick = game.disableClick

    temp = Enum.at(ansArray, id)
    queArray = List.replace_at(queArray, id, temp)

   {opentile1, opentile2, matchedIndex, score, totalClicks, disableClick} = cond do
    opentile1 == 16 && opentile2 == 16 && !Enum.member?(matchedIndex, id) ->
    {id, opentile2, matchedIndex, score, totalClicks + 1, disableClick}
    opentile1 != 16 && opentile2 == 16 && id != opentile1 && !Enum.member?(matchedIndex, id) && Enum.at(queArray, opentile1) == Enum.at(queArray, id) ->
    opentile2 = id
    matchedIndex = matchedIndex ++ [opentile1] ++ [opentile2]
    {16, 16, matchedIndex, score + 10, totalClicks + 1, disableClick}
    opentile1 != 16 && opentile2 == 16 && id != opentile1 && !Enum.member?(matchedIndex, id) && Enum.at(queArray, opentile1) != Enum.at(queArray, id) ->
    opentile2 = id
    disableClick = true
    {opentile1, opentile2, matchedIndex, score - 5, totalClicks + 1, disableClick}
    true -> {opentile1, opentile2, matchedIndex, score, totalClicks, disableClick}
   end

   %{game | queArray: queArray, opentile1: opentile1, opentile2: opentile2, matchedIndex: matchedIndex, score: score, totalClicks: totalClicks, disableClick: disableClick}
  end

  def diffTiles(game, queArray, opentile1, opentile2, boole) do
    queArray = game.queArray
    opentile1 = game.opentile1
    opentile2 = game.opentile2
    disableClick = game.disableClick

    queArray = queArray
                |> List.replace_at(opentile1, "?")
                |> List.replace_at(opentile2, "?")
  %{game | queArray: queArray, opentile1: 16, opentile2: 16, disableClick: boole}
  end

end
