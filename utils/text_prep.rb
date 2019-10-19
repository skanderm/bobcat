# frozen_string_literal: true

class TextPrep
  def self.extract_srts
    Dir.children('data/video').each do |name|
      srt_path = "data/text/#{File.basename(name, '.*')}.srt"
      `ffmpeg -i data/video/#{name.shellescape} -y -map 0:s:0 #{srt_path.shellescape}` unless File.exists?(srt_path)
    end
  end

  def self.create_prealignment_files
    dir = 'data/text/raw'
    file_names = Dir.children(dir)

    file_names.each(&method(:create_prealignment_text))
  end

  def self.create_prealignment_text(file_name)
    file_path = "data/text/raw/#{file_name}"
    text = File.read(file_path)

    new_path = "data/text/prealigned/#{file_name}"

    text
      .then(&method(:replace_dashes_with_newlines))
      .then(&method(:remove_speaker_names))
      .then(&method(:cleanup_newlines))
      .then { |t| save_text(t, new_path) }
  end

  def self.save_text(text, file_path)
    File.open(file_path, 'w') { |f| f.write(text) }
  end

  def self.replace_dashes_with_newlines(text)
    text
      .gsub(' - ', "\n")
      .gsub("\n- ", "\n")
  end

  def self.remove_speaker_names(text)
    # Removes names like BOB: or BOO BOO:
    text.gsub(/(([A-Z]+\s?)+:)/, "\n")
  end

  def self.cleanup_newlines(text)
    text.gsub(/\n+\s*/, "\n").strip
  end

  # create_prealignment_files
end
