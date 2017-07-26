const getEvent = (event) => require(`../events/${event}`);

module.exports = (client, config) => {
    client.on("message", (channel, userstate, message, self) => getEvent('message')(channel, userstate, message, self, client, config));
    client.on("connected", (address, port) => getEvent('connected')(address, port, client, config));
    client.on("connecting", (address, port) => getEvent('connecting')(address, port, client, config));
    client.on("disconnected", reason => getEvent('disconnected')(reason, client, config));
    client.on("reconnect", () => getEvent('reconnect')(client, config));
    //client.on("followersonly", (channel, enabled, length) => getEvent('followersonly')(channel, enabled, length, client, config));
    client.on("hosting", (channel, target, viewers) => getEvent('hosting')(channel, target, viewers, client, config));
    client.on("unhost", (channel, viewers) => getEvent('unhost')(channel, viewers, client, config));
    //client.on("mods", (channel, mods) => getEvent('mods')(channel, mods, client, config));
    client.on("resub", (channel, username, months, message, userstate, methods) => getEvent('resub')(channel, username, months, message, userstate, methods, client, config));
    client.on("slowmode", (channel, enabled, length) => getEvent('slowmode')(channel, enabled, length, client, config));
    //client.on("subscribers", (channel, enabled) => getEvent('subscribers')(channel, enabled, client, config));
    client.on("subscription", (channel, username, method, message, userstate) => getEvent('subscription')(channel, username, method, message, userstate, client, config));
    client.on("timeout", (channel, username, reason, duration) => getEvent('timeout')(channel, username, reason, duration, client, config));
};