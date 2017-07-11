# tumblr-toolkit

Set of CLI tools for your tumblr blog.

## Clean broken video posts tool

Broken media posts cleaning tool. Cleans up (removes) video-posts with media pointing to 403 error returning URLs (by default). See available options below.

Clean through videos returning 403 HTTP status code
```bash
tt clean -c path/to/keys.json -b blogName --clean-code 403
```

Clean through videos returning HTTP status code other than 200 (OK)
```bash
tt clean -c path/to/keys.json -b blogName --clean-code 200 --clean-invert true
```

## Posts removal tool

Deletes posts that fit passed conditions.

Remove first 10 posts from queue
```bash
tt remove -c path/to/keys.json -b blogName -s queue
```

Find and show posts that will be removed. No removal action will be taken
```bash
tt remove -c path/to/keys.json -b blogName --post-type audio --post-tag garbage
```

Remove all audio-posts, perform actual removal (dry-run false)
```bash
tt remove -c path/to/keys.json -b blogName --post-type audio --remove-dry-run false
```

## Tag posts by post's actual type tool

Tags video posts with 'video' tag, audio with 'audio' and so on...

Tag all posts
```bash
tt tag-type -c path/to/keys.json -b blogName
```

Tag all posts in queue
```bash
tt tag-type -c path/to/keys.json -b blogName -s queue
```

Tag all posts, for photo-posts containing GIFs, additionally set 'gif' tag
```bash
tt tag-type -c path/to/keys.json -b blogName --tag-type-gif add
```

Tag all photo posts containing GIFs with 'gif' tag instead of 'photo' tag
```bash
tt tag-type -c path/to/keys.json -b blogName --post-type photo --tag-type-gif replace
```

## See all commands common and specific options with

```bash
tt --help
```
```bash
tt clean --help
```
```bash
tt remove --help
```
```bash
tt tag-type --help
```

## Credentials

In order to use tumblr api for getting and processing posts, credentials file
should be provided. File content JSON should look like this:

```json
{
  "consumer_key": " consumer key value ",
  "consumer_secret": " consumer secret value ",
  "token": " token value ",
  "token_secret": "token secret value"
}
```

## Usage

Installing the tool:
```bash
npm install -g tumblr-toolkit
```

### Get access with Tumblr
* [Tumblr auto auth tool](https://github.com/achesco/tumblr-auto-auth)
* [Docs](https://www.tumblr.com/docs/en/api/v2#what_you_need)
