require 'shellwords'

class MediaPrep
  def self.rename_videos
    Dir.children('data/video/mkv').each do |name|
      number = /E(\d\d)/.match(name)&.captures&.first
      ext = File.extname(text)
      `mv "data/video/mkv/#{name.shellescape}" data/video/mkv/e#{number}#{ext}` if !number.nil? && !number.empty? && !File.exists?("data/video/mkv/e#{number}#{ext}")
    end
  end

  def self.convert_mkv_to_mp4
    Dir.children('data/video/mkv').each do |name|
      basename = File.basename(name, ".*")
      mkv_path = "data/video/mkv/#{name.shellescape}"
      mp4_path = "data/video/mp4/#{basename.shellescape}.mp4"
      `ffmpeg -i #{mkv_path} #{mp4_path}` unless File.exists?(mp4_path)
    end
  end

  def self.convert_videos_to_audio
    Dir.children('data/video/mkv').each do |name|
      audio_path = "data/audio/mp3/#{File.basename(name, ".*")}.mp3"
      `ffmpeg -i data/video/mkv/#{name.shellescape} -vn -c:a libmp3lame -y #{audio_path}` unless File.exists?(audio_path)
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

MediaPrep.convert_mkv_to_mp4
