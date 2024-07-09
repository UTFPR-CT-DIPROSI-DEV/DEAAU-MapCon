#!/bin/bash

# Upload a file to the remote server
# Usage: ./upload.sh <local_file> <remote_file_name>
# NOTE: the PEM key must have the '~/' before it for permissions to work

TARGET=$1
DSTFILE=$2
sh bscp.sh ~/private_key.pem a2358859 ${TARGET} a2358859@conflitosurbanos.cogeti.ct.internal:${DSTFILE}