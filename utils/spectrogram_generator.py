import os
import librosa
import librosa.display
import matplotlib
import matplotlib.pyplot as plt
import numpy as np

def generate_specs():
    audio_paths = [f'data/audio/wav/{filename}' for filename in os.listdir('data/audio/wav')]
    for audio_path in audio_paths:
        process_audio(audio_path)

def process_audio(audio_path):
    basename = os.path.basename(audio_path)
    rootname = os.path.splitext(basename)[0]
    print(f"Generating spectrograms for {rootname}")

    clip, sample_rate = librosa.load(audio_path, sr=None)

    slice_len = 60 # seconds

    for i, frames in enumerate(each_slice(sample_rate * slice_len, clip)):
        spec_path = f'data/spectrograms/{rootname}/{rootname}_{i}.png'
        if not os.path.isdir(f'data/spectrograms/{rootname}'):
            os.mkdir(f'data/spectrograms/{rootname}')
        if not os.path.isfile(spec_path):
            print(f"spec {i}")
            spec = librosa.feature.melspectrogram(y=np.array(frames), sr=sample_rate)
            store_spec(spec, spec_path)

def store_spec(spec, spec_path, zoom=1):
    figsize = tuple(reversed(spec.shape))
    fig = plt.figure(figsize=figsize, dpi=zoom)
    plt.gca().set_axis_off()
    librosa.display.specshow(librosa.power_to_db(spec, ref=np.max))
    fig.savefig(spec_path, dpi=zoom, bbox_inches='tight', pad_inches=0)
    plt.close(fig)

def each_slice(size, iterable):
    """ Chunks the iterable into size elements at a time, each yielded as a list.

    Example:
      for chunk in each_slice(2, [1,2,3,4,5]):
          print(chunk)

      # output:
      [1, 2]
      [3, 4]
      [5]
    """
    current_slice = []
    for item in iterable:
        current_slice.append(item)
        if len(current_slice) >= size:
            yield current_slice
            current_slice = []
    if current_slice:
        yield current_slice

generate_specs()
