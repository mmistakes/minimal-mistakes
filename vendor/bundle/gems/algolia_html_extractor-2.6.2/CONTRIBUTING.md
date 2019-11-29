## Releasing

`rake build` will build

# Tagging and releasing

If you need to release a new version of the gem to RubyGems, you have to follow
those steps:

```
# Bump the version (in develop)
./scripts/bump_version minor

# Update master and release
./scripts/release

# Install the gem locally (optional)
rake install
```
