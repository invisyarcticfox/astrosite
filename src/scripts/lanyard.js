const ws = new WebSocket('wss://lanyard.invisyarcticfox.uk/socket');
const imgpfp = document.querySelector('div#cont img.avt')
const spotify = {
  cont: document.querySelector('div#spotify'),
  link: document.querySelector('div#spotify a')
}

ws.onopen = console.log('WebSocket open!');
ws.onmessage = ({ data: msg }) => {
  try {
    const data = JSON.parse(msg);
    console.log(data);
    const { d: dData, d: { spotify: spotData } } = data
    switch (data.op) {
      case 1:
        ws.send ( JSON.stringify({ op: 2, d: { subscribe_to_id: '470193291053498369' }}));
        setInterval(() => {
          ws.send ( JSON.stringify({ op: 3 }));
        }, data.d.heartbeat_interval);
        break;
    }

    imgpfp.classList.remove('online', 'idle', 'dnd', 'offline')
    imgpfp.classList.add(dData?.discord_status || 'offline')

    if (dData?.listening_to_spotify) {
      spotify.cont.style.visibility = 'visible';
      spotify.cont.style.opacity = 1;
      spotify.link.setAttribute('data-artist', spotData?.artist)
      spotify.link.setAttribute('data-song', spotData?.song)
      if (spotData?.track_id) {
        spotify.link.href = `https://open.spotify.com/track/${spotData?.track_id}`
      }
    } else {
      spotify.cont.style.visibility = 'hidden';
      spotify.cont.style.opacity = 0;
      spotify.link.href = '#'
    }

  } catch (error) {
    console.error('Error processing WebSocket message:', error.message);
  }
};