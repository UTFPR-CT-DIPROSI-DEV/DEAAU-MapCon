#!/bin/bash
# Sync Crawler (Tracker) and Mapcon (Server) folders
# Author: Jhony Minetto Araújo <jhonyminettoaraujo@alunos.utfpr.edu.br>
DIR=/mnt/d/Joule/Documents/Jhony/Universidade/UTFPR/IC/Sistema-MAPCON
HOME=/home/todos/alunos/ct/a2358859/

# sudo ${DIR}/BASH/rsync.sh ${DIR}/BASH/private_key.pem a2358859 ${DIR}/mapcon/mapcon/build/ a2358859@conflitosurbanos.cogeti.ct.internal:${HOME}/mapcon/
if [ $1 == "mapcon" ]; then
    sudo ${DIR}/BASH/rsync.sh ${DIR}/BASH/private_key.pem a2358859 ${DIR}/mapcon/mapcon/ a2358859@conflitosurbanos.cogeti.ct.internal:${HOME}/mapcon/
elif [ $1 == "tracker" ]; then
    sudo ${DIR}/BASH/rsync.sh ${DIR}/BASH/private_key.pem a2358859 ${DIR}/Tracker/ a2358859@conflitosurbanos.cogeti.ct.internal:${HOME}/Tracker
else
    echo "Invalid argument"
fi