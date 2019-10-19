class MediaPrep
  def self.rename_videos
    Dir.children('data/video').each do |name|
      number = /E(\d\d)/.match(name)&.captures&.first
      ext = File.extname(text)
      `mv "data/video/#{name.shellescape}" data/video/e#{number}#{ext}` if !number.nil? && !number.empty? && !File.exists?("data/video/e#{number}#{ext}")
    end
  end

  def self.convert_videos_to_audio
    Dir.children('data/video').each do |name|
      audio_path = "data/audio/mp3/#{File.basename(name, ".*")}.mp3"
      `ffmpeg -i data/video/#{name.shellescape} -vn -c:a libmp3lame -y #{audio_path}` unless File.exists?(audio_path)
    end
  end

  def self.convert_mp3s_to_wav
    Dir.children('data/audio/mp3').each do |name|
      mp3_path = "data/audio/mp3/#{File.basename(name, ".*")}.mp3"
      wav_path = "data/audio/wav/#{File.basename(name, ".*")}.wav"
      `ffmpeg -i #{mp3_path} #{wav_path}` unless File.exists?(wav_path)
    end
  end
end
