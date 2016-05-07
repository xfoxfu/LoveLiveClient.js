Node-LLSIFClient
=====

*Love Live! School Idol Festival* client in Node.js.

System Requirements
-----

**Node.js** >6.0 or with babel

API
-----

First of all, you should set up a config used for message signing and other staffs.

The `llmcg_token` is your own token of an online-service at <http://llmcg.xfox.pw>,
and `client-version` should be the exact client version used by the current official client,
and `os-version` is the device information, i.e. `Nexus 6 google shamu 5.0`.

```ts
import Client = require("llsifclient");

Client.setConfig({
  "llmcg_token": "xxxxxxx",
  "headers": {
    "application-id": "626776655",
    "accept": "*/*",
    "time-zone": "JST",
    "api-model": "straightforward",
    "client-version": "17.6",
    "host": "prod-jp.lovelive.ge.klabgames.net",
    "os": "Android",
    "accept-encoding": "gzip,deflate",
    "debug": "1",
    "region": "392",
    "bundle-version": "3.2",
    "os-version": "Nexus 6 google shamu 5.0",
    "platform-type": "2"
  }
});
```

You may register a new account with `.reg`, the first parameter is delay for some operations in millisecond,
and the second parameter is the nickname of the account, which defaults to random chosen from official nickname list,
and the third parameter is the leader id, which you can select from 1 to 9, and is also defaults to random chosed.

```ts
let client = Client.reg({
    tos: 2000;
    selectLeader: 5000;
    setName?: number;
  }, "nickname", 4);
```

You may apply a transfer code with `.startFromTransferCode`.

You may get a transfer code with `#generateTransferCode`.

Technical Words
-----

`login_key` = `loginKey` is like a username.

`login_passwd` = `loginPasswd` is like a password.

`unit` means a card.

`unit_owning_user_id` means a card id.

`live_difficulty_id` means a song at a specified difficulty level.

**unit/merge** means special practise.

**unit/rankUp** means practise.

License
-----

```
    Copyright (C) 2016 coderfox

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
```