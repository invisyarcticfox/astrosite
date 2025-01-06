const ws = new WebSocket('wss://api.lanyard.rest/socket');
const statusColours = {
  online: '#23A55A',
  idle: '#F0B232',
  dnd: '#F23F43',
  offline: '#80848E',
};
const bigAvt = document.querySelector('.box .avt');

ws.onmessage = ({ data: msg }) => {
  try {
    const data = JSON.parse(msg);
    console.log(data);
    switch (data.op) {
      case 1:
        ws.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_id: '470193291053498369',
            },
          }),
        );
        setInterval(() => {
          ws.send(
            JSON.stringify({
              op: 3,
            }),
          );
        }, data.d.heartbeat_interval);
        break;
    }

    bigAvt.style.outlineColor = statusColours[data.d.discord_status];
  } catch (error) {
    console.error('ws error', error);
  }
};