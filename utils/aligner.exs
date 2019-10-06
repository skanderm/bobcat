defmodule Aligner do
  def align do
    {:ok, text_names} = File.ls("data/text/raw")

    pairs =
      Enum.map(text_names, fn text_name ->
        root_name = Path.rootname(text_name)
        %{text_path: "data/text/raw/#{text_name}", audio_path: "data/audio/#{root_name}.mp3"}
      end)
  end
end

Aligner.align()
