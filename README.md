# Merge User API for Smooch

This POC code uses a headless browser to leverage the init with authCode feature of the Smooch Web SDK to hack together a merge user API.

You maybe probably definitely shouldn't do this in production, and all the edge cases probably definitely haven't been discovered.

# Interface

This sample exposes a service with a `POST /merge` route that takes a JSON body

```json
{
    "userId": "this_user_id_is_upserted",
    "users": ["this_array_of_users_are_merged_under_the_userId"]
}
```

# Get started

1. Create a _.env_ file based on _.env.example_.
2. Run `npm start`.
3. Make a POST request to `/merge` with a body something like this
```json
{ "userId": "bob", "users": ["94d89...", "2083f..."] }
```
