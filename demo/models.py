from django.db import models
from .vae import ModularizedVAE
from .midi_utils import dump_midi
import torch
import os

midi_dir = 'midi'
if not os.path.exists(midi_dir):
    os.makedirs(midi_dir)

use_cuda = torch.cuda.is_available()
device = torch.device("cuda:0" if use_cuda else "cpu")

model = torch.load('./MVAE_Music/models/ModularizedVAE/ModularizedVAE_e100.pt')
vae = ModularizedVAE(**model['model_args']).to(device)
vae.load_state_dict(model['state_dict'])
project = torch.nn.Linear(2, vae.hidden_size).to(device)

def generate_midi(x, y):
    z = torch.Tensor([[x, y]]).to(device)
    z = project(z)
    output = vae.decode(z)
    output = [o.max(-1)[-1] for o in output]
    output = torch.stack(output).squeeze().transpose(0, 1)
    output = output.detach().cpu().numpy()
    filename = os.path.join(midi_dir, '%.2f_%.2f.mid' % (x, y))
    dump_midi(output, model['note_sets'], filename)
    return filename
    
