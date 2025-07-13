# A Colorado Trail relay

Brought to you by Bex 🚴‍♀️ and Kelly 🏃‍♀️.

## Updating the track

Until we figure out how to pull directly from the Garmin API, we have to:

1. Go to <https://share.garmin.com/JOYQV/>
2. Open developer tools
3. Find the response from `wss://share.garmin.com/signalr/connect`
4. Reload the page (zoomed out far enough to see the entire track)
5. Copy the last `UpdateUser` message to [src/data/update-user.json](./src/data/update-user.json)
