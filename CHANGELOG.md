CHANGELOG
=====

0.2
-----

Current Stage: `prealpha`

** support delays to simulate real actions on devices **

This change causes one incompatiable API change:

*1.*

From `client.register(name?: string, leader?: number): Promise<Client>`

To

```
register(delays?: {
    tos?: number;
    selectLeader?: number;
    setName?: number;
  }, name?: string, leader?: number): Promise<Client>
```

And two compatiable API change:

*1.*

From `client.tosCheckAndAgree()`

To `client.tosCheckAndAgree(interval?: number)`

*2.*

From `client.startFromTransferCode(code: string)`

To `client.startFromTransferCode(code: string, delays?: { tos?: number, code?: number })`

*3.*

From `client#startGame()`

To `client#startGame(delays?: { tos?: number })`

And the default value for `name` and `leader` is also changed to produce randomly.

**supports renew of transfer code**

`client#regenerateTransferCode()`

**better return value of get transfer code**

From `string` To `{ code: string, expire_date: string }`

**wrap plain call to APIs**

From `client#{xxxxxx}` To `client#api.{xxxxxxx}`