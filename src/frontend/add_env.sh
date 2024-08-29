#!/bin/bash

ROOT_DIR=$(realpath "$(dirname "$0")/../..")

SRC_PATH="$ROOT_DIR/.env"
DEST_PATH=".env"

echo $ROOT_DIR
echo $SRC_PATH
echo $DEST_PATH

if [ -f "$SRC_PATH" ]; then
  cp "$SRC_PATH" "$DEST_PATH"
  echo ".env file has been copied to the root directory."
else
  echo "No .env file found at $SRC_PATH."
fi