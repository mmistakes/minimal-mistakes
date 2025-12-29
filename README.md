## 1. Install prerequisites

### Ruby
- **macOS / Linux**: Ruby is usually preinstalled.
- **Windows**: Install **Ruby+Devkit (x64)** from https://rubyinstaller.org  
  - Enable **“Add Ruby executables to PATH”**
  - Install the **MSYS2 development toolchain** when prompted

Verify installation:
```bash
ruby -v
```

### Jekyll and Bundler

All in Ruby terminal:

```bash
gem install bundler jekyll
```

Verify:

```bash
bundle -v
jekyll -v
```

## 2. Clone the repository

```bash
git clone https://github.com/zbirobin/zbirobin.github.io.git
cd zbirobin.github.io
```

## 3. Install site dependencies

```bash
bundle install
```

## 4. Serve the site locally

```bash
bundle exec jekyll serve
```
