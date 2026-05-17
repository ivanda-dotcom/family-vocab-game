#!/bin/bash
TS="$(date +%Y%m%d-%H%M%S)"
echo "Moving current state aside..."
[ -d "pages" ] && mv pages "pages.corrupt.$TS"
[ -d "data" ] && mv data "data.corrupt.$TS"
[ -d "components" ] && mv components "components.corrupt.$TS"

echo "Restoring from backup..."
cp -R "~/hermes-agent-backups/family-vocab-game/20260516-114216/pages" pages
cp -R "~/hermes-agent-backups/family-vocab-game/20260516-114216/data" data
cp -R "~/hermes-agent-backups/family-vocab-game/20260516-114216/components" components

echo "Restore complete."
