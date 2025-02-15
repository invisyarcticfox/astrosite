const ws = new WebSocket('wss://lanyard.invisyarcticfox.uk/socket');
const imgpfp = document.querySelector('div#cont img.avt')

ws.onopen = console.log('WebSocket open!');
ws.onmessage = ({ data: msg }) => {
  try {
    const data = JSON.parse(msg);
    console.log(data);
    const { d: dData } = data
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

  } catch (error) {
    console.error('Error processing WebSocket message:', error.message);
  }
};