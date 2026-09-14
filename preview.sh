#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
host="${HOST:-127.0.0.1}"
port="${PORT:-4000}"

cd "$repo_root"

if ! command -v bundle >/dev/null 2>&1; then
    echo "Bundler is required. Install it with: gem install bundler" >&2
    exit 1
fi

if ! bundle check >/dev/null 2>&1; then
    echo "Installing Jekyll dependencies..."
    bundle install
fi

echo "Preview: http://$host:$port/"
exec bundle exec jekyll serve \
    --host "$host" \
    --port "$port" \
    --baseurl "" \
    --livereload
