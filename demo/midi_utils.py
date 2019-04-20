from pretty_midi import PrettyMIDI, Instrument, Note

def dump_midi(data, note_sets, path):
    midi_file = PrettyMIDI(resolution=220, initial_tempo=120)
    track = Instrument(0)
    time = 0

    # Shift first timing to 0
    #time -= note_sets['timing'][data[0][0]] * 30
    
    for note in data:
        # <padding> == 0
        if note[0] == 0:
            continue
        time += note_sets['timing'][note[0]] * 15 / 120
        track.notes.append(Note(
            velocity=100,
            start=time,
            end=time + note_sets['duration'][note[1]] * 15 / 120,
            pitch=note_sets['pitch'][note[2]]))
        #print(track.notes[-1])
    midi_file.instruments.append(track)
    midi_file.write(path)



