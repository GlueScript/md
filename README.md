md
===

Node service to work on resources and report on their metadata.

Usage:

  curl -X POST -d http://www.resources.net/thing/7 -H 'Content-Type: text/plain' http://md.service/

This will respond with a json object containing metadata about http://www.resources.net/thing/7
