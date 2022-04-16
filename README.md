# OCPP-RPC

A client & server implementation of the WAMP-like RPC-over-websocket system defined in the OCPP protcols (e.g. OCPP1.6-J and OCPP2.0.1).

Requires Node.js >= 14.17.0 (or >= 17.2.0 for `AbortController#abort([reason])` support)

# Features

* **Everything is abortable** - `AbortSignal`s can be passed to most async methods.
* **Automatic reconnects** - Client supports automatic exponential-backoff reconnects.
* **Automatic keep-alive** - Regularly performs pings, and drops dangling TCP connections.
* **Graceful shutdowns** - Supports waiting for all in-flight messages to be responded to before closing sockets.
* **Clean closing of websockets** - Supports sending & receiving close codes & reasons.
* **Authentication** - Optional authentication step for filtering incoming clients.
* **Subprotocol negotiation** - 


## RPCClient state lifecycle

**CLOSED**  
* RPC calls while in this state are rejected.
* RPC responses will be silently dropped.

**CONNECTING**  
* RPC calls & responses while in this state will be queued.

**OPEN**  
* Previously queued messages are sent to the server upon entering this state. RPC calls & responses while in this state are sent to the server after the queue is empty.

**CLOSING**  
* RPC calls while in this state are rejected.
* RPC responses will be silently dropped.

Note: Whenever the underlying websocket loses connection, any in-flight outbound RPC calls are immediately rejected, and the `AbortSignal`s passed to any in-flight inbound RPC calls are aborted.

## License

MIT