#!/bin/bash
DIR=/mnt/d/Joule/Documents/Jhony/Universidade/UTFPR/IC/Sistema-MAPCON
HOME=/home/todos/alunos/ct/a2358859/

# sudo ${DIR}/BASH/rsync.sh ${DIR}/BASH/private_key.pem a2358859 ${DIR}/mapcon/mapcon/build/ a2358859@conflitosurbanos.cogeti.ct.internal:${HOME}/mapcon/
sudo ${DIR}/BASH/rsync.sh ${DIR}/BASH/private_key.pem a2358859 ${DIR}/mapcon/mapcon/ a2358859@conflitosurbanos.cogeti.ct.internal:${HOME}/mapcon/