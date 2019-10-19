import os
import librosa
import librosa.display
import matplotlib
import matplotlib.pyplot as plt
import numpy as np

def generate_specs():
    paths = [f'data/audio/wav/{filename}' for filename in os.listdir('data/audio/wav')]
    for path in paths:
        basename = os.path.basename(path)
        rootname = os.path.splitext(basename)[0]
        spec_path = f'data/spectrograms/{rootname}.jpg'

        if not os.path.exists(spec_path):
            create_spec(path, spec_path)

def create_spec(fn_audio, fn_gram):
    clip, sample_rate = librosa.load(fn_audio, sr=None)
    S = librosa.feature.melspectrogram(y=clip, sr=sample_rate)
    fig = plt.figure(figsize=tuple(reversed(S.shape)), dpi=1)
    plt.gca().set_axis_off()
    librosa.display.specshow(librosa.power_to_db(S, ref=np.max))
    fig.savefig(fn_gram, dpi=zoom, bbox_inches='tight', pad_inches=0)
    plt.close(fig)

generate_specs()
