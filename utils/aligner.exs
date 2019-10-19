defmodule Aligner do
  def align do
    {:ok, text_names} = File.ls("data/text/raw")

    pairs =
      Enum.map(text_names, fn text_name ->
        root_name = Path.rootname(text_name)

        %{
          root_name: root_name,
          text_path: "data/text/raw/#{text_name}",
          audio_path: "data/audio/mp3/#{root_name}.mp3"
        }
      end)

    pairs
    |> Enum.each(&align_file/1)
  end

  def align_file(%{text_path: text_path, audio_path: audio_path, root_name: root_name}) do
    case File.exists?("data/text/aligned/#{root_name}.json") do
      true ->
        :ok

      _ ->
        run_alignment(text_path, audio_path)
    end
  end

  def run_alignment(text_path, audio_path) do
    root_name = text_path |> Path.basename() |> Path.rootname()

    IO.puts("Running alignment for #{root_name}")
    hash = exec("docker", ~w[run -Pd lowerquality/gentle])
    port = exec("docker", ~w[port #{hash}]) |> String.split(":") |> List.last()

    :timer.sleep(2000)

    cmd =
      ~w[-s -F audio=@#{audio_path} -F transcript=@#{text_path} 0.0.0.0:#{port}/transcriptions?async=false]

    results = exec("curl", cmd)

    File.write("data/text/aligned/#{root_name}.json", results)

    IO.puts("Finished with #{root_name}")

    exec("docker", ~w[stop #{hash}])
  end

  def exec(cmd, opts) do
    {resp, 0} = System.cmd(cmd, opts)
    String.trim(resp)
  end
end

# Aligner.align()
