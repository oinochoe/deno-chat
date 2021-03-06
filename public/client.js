let ws;

window.addEventListener('DOMContentLoaded', () => {
    ws = new WebSocket(`ws://localhost:5123/ws`);
    ws.addEventListener('open', onConnectionOpen);
    ws.addEventListener('message', onMessageReceived);
});

function onConnectionOpen() {
    const queryParams = getQueryParams();
    if (!queryParams.name || !queryParams.group) {
        window.location.href = 'chat.html';
    }
    const event = {
        event: 'join',
        groupName: queryParams.group,
        name: queryParams.name,
    };
    ws.send(JSON.stringify(event));
}

function onMessageReceived(event) {
    console.log('Message received');
    const data = JSON.parse(event.data);
    console.log(data);
}

function getQueryParams() {
    const search = window.location.search.substring(1);
    const pairs = search.split('&');
    const params = {};
    for (const pair of pairs) {
        const parts = pair.split('=');
        params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    }
    return params;
}
