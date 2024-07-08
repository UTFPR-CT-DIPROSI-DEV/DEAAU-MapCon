#!/bin/bash
DIR=/mnt/e/Users/jhony/Documents/Jhony/Universidade/UTFPR/MAPCON
HOME=/home/todos/alunos/ct/a2358859/

cd ${DIR}/Sistema-MAPCON/mapcon
tar czf ${DIR}/mapcon.tar.gz mapcon/

sudo ${DIR}/BASH/bscp.sh ${DIR}/BASH/private_key.pem a2358859 ${DIR}/mapcon.tar.gz a2358859@conflitosurbanos.cogeti.ct.internal:${HOME}/mapcon.tar.gz